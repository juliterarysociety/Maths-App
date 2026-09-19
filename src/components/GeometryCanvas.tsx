import React, { useEffect, useRef, useState } from 'react';
import JXG from 'jsxgraph';
import { DiagramConfig } from '../types';
import { Maximize2, Minimize2, RotateCcw, ZoomIn, ZoomOut, Move } from 'lucide-react';

interface GeometryCanvasProps {
  diagram_config?: DiagramConfig;
  className?: string;
  interactiveHint?: string;
}

export const GeometryCanvas: React.FC<GeometryCanvasProps> = ({
  diagram_config,
  className = '',
  interactiveHint = 'Drag points to explore geometric relations'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [boardReady, setBoardReady] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Generate unique DOM id for JSXGraph container
  const containerIdRef = useRef(
    `jxg_${diagram_config?.diagram_id || 'board'}_${Math.random().toString(36).substring(2, 8)}`
  );

  useEffect(() => {
    if (!diagram_config || !containerRef.current) return;

    const containerId = containerIdRef.current;
    if (containerRef.current) {
      containerRef.current.id = containerId;
    }

    // Default board settings optimized for mobile and desktop gamified look
    const defaultConfig = {
      axis: true,
      grid: false,
      showNavigation: false,
      showCopyright: false,
      keepaspectratio: true,
      pan: { enabled: true, needShift: false },
      zoom: { factorX: 1.25, factorY: 1.25, wheel: false, needShift: false },
      ...diagram_config.board_config
    };

    let board: any = null;

    try {
      // 1. Initialize the board using JXG.JSXGraph.initBoard
      board = JXG.JSXGraph.initBoard(containerId, defaultConfig as any);
      boardRef.current = board;

      // 2. Implement an elementsMap = {} dictionary
      const elementsMap: Record<string, any> = {};

      // 3. Iterate through elements
      if (Array.isArray(diagram_config.elements)) {
        diagram_config.elements.forEach((el) => {
          try {
            // Map string parent IDs to live instances from elementsMap
            const resolvedParents = Array.isArray(el.parents)
              ? el.parents.map((p) => {
                  if (typeof p === 'string' && elementsMap[p]) {
                    return elementsMap[p];
                  }
                  return p;
                })
              : [];

            // If it's a point and parents format is [[x, y]], unwrap to [x, y]
            let finalParents: any = resolvedParents;
            if (
              el.type === 'point' &&
              resolvedParents.length === 1 &&
              Array.isArray(resolvedParents[0])
            ) {
              finalParents = resolvedParents[0];
            }

            // Create the element with board.create(el.type, resolvedParents, el.attributes)
            const createdElement = board.create(
              el.type,
              finalParents,
              el.attributes || {}
            );

            // Store resulting object in elementsMap[el.id]
            if (createdElement) {
              elementsMap[el.id] = createdElement;
            }
          } catch (elemErr) {
            console.warn(`[GeometryCanvas] Error creating element ${el.id}:`, elemErr);
          }
        });
      }

      setBoardReady(true);
    } catch (err) {
      console.error('[GeometryCanvas] Failed to initialize JSXGraph board:', err);
    }

    // 4. Return cleanup function calling JXG.JSXGraph.freeBoard(board)
    return () => {
      setBoardReady(false);
      if (board) {
        try {
          JXG.JSXGraph.freeBoard(board);
        } catch (e) {
          console.error('[GeometryCanvas] Error freeing board:', e);
        }
        boardRef.current = null;
      }
    };
  }, [diagram_config]);

  // Handle zoom and reset controls
  const handleZoomIn = () => {
    if (boardRef.current) {
      boardRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (boardRef.current) {
      boardRef.current.zoomOut();
    }
  };

  const handleReset = () => {
    if (boardRef.current && diagram_config?.board_config?.boundingbox) {
      boardRef.current.setBoundingBox(diagram_config.board_config.boundingbox);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
    setTimeout(() => {
      if (boardRef.current) {
        boardRef.current.resizeContainer(
          containerRef.current?.clientWidth || 300,
          containerRef.current?.clientHeight || 260
        );
      }
    }, 150);
  };

  if (!diagram_config) {
    return null;
  }

  return (
    <div
      ref={cardRef}
      id="geometry-canvas-card"
      className={`relative bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-4 z-50 flex flex-col bg-white shadow-2xl p-4'
          : 'p-3 sm:p-4'
      } ${className}`}
    >
      {/* Canvas Top Bar / Controls */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Interactive Diagram
          </div>
          <span className="hidden sm:inline text-xs text-slate-500">
            {diagram_config.diagram_id.replace(/_/g, ' ')}
          </span>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-1 bg-slate-50 rounded-xl p-1 border border-slate-200/70">
          <button
            type="button"
            id="diagram-zoom-in-btn"
            onClick={handleZoomIn}
            title="Zoom In"
            className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-white transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            id="diagram-zoom-out-btn"
            onClick={handleZoomOut}
            title="Zoom Out"
            className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-white transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            id="diagram-reset-btn"
            onClick={handleReset}
            title="Reset View"
            className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            id="diagram-fullscreen-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-white transition-colors"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* JSXGraph Container Div */}
      <div className="relative w-full overflow-hidden rounded-xl bg-slate-50/50 border border-slate-100 flex-1">
        <div
          ref={containerRef}
          className={`jxgbox w-full select-none ${
            isFullscreen ? 'h-[75vh]' : 'h-64 sm:h-72'
          }`}
          style={{ width: '100%', touchAction: 'none' }}
        />

        {/* Floating Touch / Mouse Tip */}
        <div className="absolute bottom-2 left-2 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-xs text-[11px] font-medium text-slate-600 border border-slate-200/60 shadow-xs">
          <Move className="w-3 h-3 text-blue-500" />
          <span>{interactiveHint}</span>
        </div>
      </div>
    </div>
  );
};

export default GeometryCanvas;
