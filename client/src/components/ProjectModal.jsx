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
    <div className="w-full h-[500px] border border-gray-800 rounded-lg bg-[#0a0a0a]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background color="#333" gap={16} variant="dots" />
        <Controls className="bg-gray-900 border-gray-700 fill-white" />
      </ReactFlow>
    </div>
  );
}

import WebhookArchitecture from './architecture/WebhookArchitecture';
<WebhookArchitecture/>