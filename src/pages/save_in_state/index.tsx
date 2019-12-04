import React, { Component } from 'react';
import {
  DiagramEngine,
  DiagramModel,
  DefaultLinkModel,
  DefaultNodeModel,
  LinkModel,
  DefaultPortModel,
  DefaultPortFactory,
  DiagramWidget, PointModel, BaseEvent, NodeModel,
// } from "react-diagrams-forked";
} from 'react-diagrams-forked';
import styles from './index.less';
import 'react-diagrams-forked/dist/style.min.css'

const resetTimeout = (id, newID) => {
  clearTimeout(id);
  return newID
}

class SaveInState extends Component{

  state={
    diagramModel: null,
    timeout: null,
    saved: new Date().getTime(),
  }

  shouldComponentUpdate(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean {
    if(this.state.timeout !== nextState.timeout){
      return false;
    }
    return true;
  }

  editMap = (engine) => {
    let newTimeout = resetTimeout(
      this.state.timeout,
      setTimeout(() => this.saveMap(engine),
        400));
    this.setState({
      timeout: newTimeout})
  }

  saveMap = (engine) => {
    console.debug("begin saveMap");
    let diagramModel = engine.getDiagramModel();
    console.debug("diagramModel", JSON.stringify(diagramModel.serializeDiagram()));
    this.setState({diagramModel: JSON.stringify(diagramModel.serializeDiagram()), saved: new Date().getTime()});

  }

  addListener = (engine: DiagramEngine) => {
    let diagramModel = engine.getDiagramModel();
    let nodes = diagramModel.getNodes();
    Object.keys(nodes).map(key => {
      nodes[key].addListener({
        positionChanged : (event: BaseEvent<NodeModel>) => {
          console.debug("event.firing", event.firing);
          this.editMap(engine);
        }
      })
    })
  };

  render() {
    let engine = new DiagramEngine();
    engine.installDefaultFactories();

    let model = null;
    if(this.state.diagramModel == null){
      //2) setup the diagram model
      model = new DiagramModel();

      //3-A) create a default node
      var node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
      let port1 = node1.addOutPort("Out");
      node1.setPosition(100, 100);

      //3-B) create another default node
      var node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
      let port2 = node2.addInPort("In");
      node2.setPosition(400, 100);

      // link the ports
      let link1 = port1.link(port2);
      (link1 as DefaultLinkModel).addLabel("Hello World!");

      //4) add the models to the root graph
      model.addAll(node1, node2, link1);
    }else{
      model = new DiagramModel();
      model.deSerializeDiagram(JSON.parse(this.state.diagramModel), engine);
    }

    //5) load model into engine
    engine.setDiagramModel(model);

    this.addListener(engine);

    return (
      <div className={styles.normal}>
        <p>上次保存时间：{this.state.saved}</p>
        <DiagramWidget  className={styles.srdDemoCanvas}
                        diagramEngine={engine}
                        maxNumberPointsPerLink={0}
        />
      </div>
    );
  }
}
export default SaveInState;
