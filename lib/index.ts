import {DebugElement} from "angular2/core";

class LogGroup {
  messages: string[] = [];
  inner: LogGroup[] = [];

  constructor(public name: string) {
  }

  child(name: string): LogGroup {
    let newChild = new LogGroup(name);
    this.inner.push(newChild);
    return newChild;
  }

  addMessage(msg: string): LogGroup {
    this.messages.push(msg);
    return this;
  }

  emit() {
    console.group(this.name);
    this.messages.forEach(msg => {
      console.log(msg);
    });
    this.inner.forEach(child => {
      child.emit();
    });
    console.groupEnd();
  }
}

// global context
var context = <any>window;

// ng.probe
declare var ng: { probe: (el: Element) => DebugElement };

class Angular2TreeTool {

  buildTree() {
    var rootNodes: DebugElement[];
    if ("getAllAngularRootElements" in context) {
      rootNodes = context.getAllAngularRootElements().map((el: Element) => ng.probe(el));
    } else {
      rootNodes = [this.findRoot()];
    }

    if (!rootNodes || rootNodes.length === 0) {
      throw "Cannot find rootNodes ng2 element!";
    }
    const logger = new LogGroup("/");
    rootNodes.forEach((rootNode: DebugElement) => {
      this.walk(rootNode, logger);
      logger.emit();
    });
  }

  private walk(el: DebugElement, logger: LogGroup) {
    if (!el) {
      return;
    }
    var _logger = logger;
    if (el.componentInstance) {
      let name = el.name || el.nativeElement.localName;
      let cmpName = el.providerTokens[0].name;
      _logger = logger.child(`/${name}: ${cmpName}`);

      if (JSON.stringify(el.componentInstance) !== "{}") {
        _logger.addMessage(el.nativeElement);
      }
    }

    el.children.forEach(child => {
      this.walk(child, _logger);
    });
  }

  private findRoot(): DebugElement {
    const elements = document.body.children;
    for (let i = 0; i < elements.length; i++) {
      const el = ng.probe(elements.item(i));
      if (el && el.componentInstance) {
        return el;
      }
    }
  }
}

export function enableNg2Tree() {
  console.log("Let's execute `ng2tree();`");
  context.ng2tree = () => {
    new Angular2TreeTool().buildTree();
  };
}

