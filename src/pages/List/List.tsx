import React, { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dom, Graph, Shape, Addon } from '@antv/x6';
import { RootState } from '@/stores';

import {Layout, Node, DndWarp, Circle, Container} from './styled';

const {Dnd} = Addon
const data = {
  // 节点
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40, // Number，必选，节点位置的 x 值
      y: 40, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'hello', // String，节点标签
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 160, // Number，必选，节点位置的 x 值
      y: 180, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'world', // String，节点标签
    },
  ],
  // 边
  edges: [
    {
      source: 'node1', // String，必须，起始节点 id
      target: 'node2', // String，必须，目标节点 id
    },
  ],
};

interface IProps {}
const List: FC<IProps> = () => {
  let graphRef = useRef<Graph>().current;
  let graphDndRef = useRef<any>().current;
  const graphContainer = useRef<any>();
  const dispatch = useDispatch();
  const globalModel = useSelector((models: RootState) => models.global);

  dispatch({
    type: 'global/fetchSelect'
  })
  console.log(globalModel);

  useEffect(() => {
    graphRef = new Graph({
      container: graphContainer.current,
      width: graphContainer.current.clientWidth,
      height: graphContainer.current.clientHeight,
    });

    Graph.registerNode('custom-node', {
      inherit: 'rect',
      attrs: {
        body: {
          rx: '100%',
          ry: '100%',
          stroke: 'rgb(103,167,250, .2)',
          fill: 'rgb(103,167,250, .5)',
        },
        label: {
          text: 'custom-node',
        },
      },
    })

    const rect = new Shape.Rect({
      id: 'node3',
      x: 305,
      y: 200,
      width: 80,
      height: 40,
      angle: .5,
      attrs: {
        body: {
          rx: '100%',
          ry: '100%',
          stroke: 'rgb(103,167,250, .2)',
          fill: 'rgb(103,167,250, .5)',
        },
        label: {
          text: 'Hello',
        },
      },
    })


    graphRef.fromJSON(data)
    graphRef.addNode(rect)
    graphRef.addNode({
      id: 'custom-node-1',
      width: 80,
      height: 80,
      x: 300,
      y: 300,
      shape: 'custom-node',
      label: 'node',
    })
    graphRef.addEdge({
      shape: 'edge',
      source: 'custom-node-1',
      target: 'node3'
    })
    graphRef.addEdge({
      shape: 'double-edge',
      source: 'node3',
      target: 'node2',
      attr: {
        line: {
          targetMarker: {
            file: 'transparent'
          }
        }
      }
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    graphDndRef = new Dnd({
      target: graphRef,
      scaled: false,
      animation: true,
      validateNode(droppingNode: { shape: string; }, options: { draggingNode: any; draggingGraph: any; }) {
        return droppingNode.shape === 'html'
          ? new Promise<boolean>((resolve) => {
            const { draggingNode, draggingGraph } = options
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const view = draggingGraph.findView(draggingNode)!
            const contentElem = view.findOne('foreignObject > body > div')
            Dom.addClass(contentElem, 'validating')
            setTimeout(() => {
              Dom.removeClass(contentElem, 'validating')
              resolve(true)
            }, 3000)
          })
          : true
      },
    })
  }, []);

  const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget
    const type = target.getAttribute('data-type')
    const node =
      type === 'Node'
        ? graphRef?.createNode({
          width: 100,
          height: 40,
          attrs: {
            label: {
              text: 'Node',
              fill: '#6a6c8a',
            },
            body: {
              stroke: '#31d0c6',
              strokeWidth: 2,
            },
          },
        })
        : graphRef?.createNode({
          width: 60,
          height: 60,
          shape: 'html',
          html: () => {
            const wrap = document.createElement('div')
            wrap.style.width = '100%'
            wrap.style.height = '100%'
            wrap.style.display = 'flex'
            wrap.style.alignItems = 'center'
            wrap.style.justifyContent = 'center'
            wrap.style.border = '2px solid rgb(49, 208, 198)'
            wrap.style.background = '#fff'
            wrap.style.borderRadius = '100%'
            wrap.innerText = 'Circle'
            return wrap
          },
        })

    graphDndRef?.start(node, e.nativeEvent as any)
  }

  return (
    <Layout>
      <DndWarp>
        <Node onMouseDown={startDrag} data-type="Node">Node</Node>
        <Circle onMouseDown={startDrag} data-type="Circle">Circle</Circle>
      </DndWarp>
      <Container ref={graphContainer}/>
    </Layout>
  );
};

export default List;
