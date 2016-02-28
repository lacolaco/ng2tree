import {DebugNode, DebugElement} from "angular2/core";

// ng.probe
declare var ng:{ probe: (el:Element) => DebugElement };

class Angular2TreeTool {

  buildTree():string {
    const root = this.findRoot();
    if (!root) {
      throw "Cannot find root ng2 element!";
    }
    const cmpElements = this.walk(root);
    const cmpLines = cmpElements.map((item)=> {
      let indent = "";
      for (let i = 0; i < item.depth; i++) {
        indent += "\t";
      }
      const tagName = item.element.nativeElement.localName;
      const cmpClassName = item.element.componentInstance.constructor.name;
      const cmpProps = JSON.stringify(item.element.componentInstance);
      return `${indent}<${tagName}> ${cmpClassName} ${cmpProps}`;
    });
    return cmpLines.join("\n");
  }

  private walk(el:DebugElement, depth = 0, components = <any>[]):{depth: number, element: DebugElement}[] {
    if (el.componentInstance) {
      components.push({depth: depth, element: el});
      depth++;
    }
    el.children.forEach((child:DebugElement) => {
      this.walk(child, depth, components);
    });
    return components;
  }

  private findRoot():DebugElement {
    const elements = document.body.children;
    for (let i = 0; i < elements.length; i++) {
      const el = ng.probe(elements.item(i));
      if (el && el.componentInstance) {
        return el;
      }
    }
  }
}

// global context
var context = <any>window;

export function enableNg2Tree() {
  console.log("Let's execute `ng2tree();`");
  context.ng2tree = () => {
    return new Angular2TreeTool().buildTree();
  };
}

