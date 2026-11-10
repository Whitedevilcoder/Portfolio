import { useState, useCallback } from 'react';
import ReactFlow, {
    Background,
    Controls,
    applyNodeChanges,
    applyEdgeChanges
} from 'reactflow';
import 'reactflow/dist/style.css';

// Define the components of your Webhook Relay
const initialNodes = [
    {
        id: 'external-api',
        position: { x: 250, y: 0 },
        data: { label: 'External Services (Stripe, GitHub, etc.)' },
        type: 'input',
    },
    {
        id: 'express-server',
        position: { x: 250, y: 100 },
        data: { label: 'Node.js / Express Server (Webhook Receiver)' },
    },
    {
        id: 'mongodb',
        position: { x: 100, y: 250 },
        data: { label: 'MongoDB (Mongoose Schema)' },
    },
    {
        id: 'socket-io',
        position: { x: 400, y: 250 },
        data: { label: 'Socket.io Server (Real-time Stream)' },
    },
    {
        id: 'client-dashboard',
        position: { x: 400, y: 400 },
        data: { label: 'React Frontend Dashboard' },
        type: 'output',
    },
];

// Define how data flows between them
const initialEdges = [
    { id: 'e1-2', source: 'external-api', target: 'express-server', animated: true, label: 'POST Request' },
    { id: 'e2-3', source: 'express-server', target: 'mongodb', label: 'Store Payload' },
    { id: 'e2-4', source: 'express-server', target: 'socket-io', label: 'Emit Event' },
    { id: 'e4-5', source: 'socket-io', target: 'client-dashboard', animated: true, label: 'WebSocket Stream' },
];



export default function WebhookArchitecture() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    return (
        // The container MUST have a fixed height or min-height
        <div className="w-full h-[50vh] min-h-[350px] max-h-[600px] border border-gray-800 rounded-lg bg-[#0a0a0a]">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <Background color="#333" gap={16} variant="dots" />
                {/* Remove the Tailwind classes here, they conflict with React Flow's internal styles */}
                <Controls />
            </ReactFlow>
        </div>
    );
}

