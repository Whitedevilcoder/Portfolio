// src/components/ProjectModal.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import WebhookArchitecture from './architecture/WebhookArchitecture';

export default function ProjectModal({ project, onClose }) {
    // Prevent scrolling on the background body when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'unset';
    }, []);
    console.log("Project Title:", project.title);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-2 sm:p-6 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="bg-cyber-gray border border-cyber-purple w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg p-6 relative flex flex-col gap-6"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                >
                    &times;
                </button>

                {/* Project Details */}
                <h2 className="text-3xl font-bold text-white">{project.title}</h2>

                <div className="flex gap-2 flex-wrap">
                    {project.techStack.map((tech, i) => (
                        <span key={i} className="text-sm text-cyber-purple bg-cyber-purple/10 px-2 py-1 rounded border border-cyber-purple/20">
                            {tech}
                        </span>
                    ))}
                </div>

                <p className="text-gray-300 leading-relaxed">
                    {project.description}
                </p>

                {/* CONDITIONAL ARCHITECTURE DIAGRAM */}
                {/* Replace 'Webhook Relay' with the exact title string of your webhook project from your database */}
                {project.title.toLowerCase().includes('webhook') && (
                    <div className="mt-4 flex flex-col gap-2">
                        <h3 className="text-xl font-bold text-cyber-purple">System Architecture</h3>
                        {/* The 500px tall diagram now safely renders inside the scrolling modal */}
                        <WebhookArchitecture />
                    </div>
                )}

                {/* Action Links */}
                <div className="flex gap-4 mt-4 pt-4 border-t border-gray-800">
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-cyber-purple border border-cyber-purple px-4 py-2 hover:bg-cyber-purple hover:text-black transition-all">
                        Live Demo
                    </a>
                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-gray-400 px-4 py-2 hover:text-white transition-all">
                        Source Code
                    </a>
                </div>

            </motion.div>
        </motion.div>
    );
}