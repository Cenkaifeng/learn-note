import { Componen, STATE, ATTRIBUTE, creacteElement } from "./framework.js";
import { enableGesture } from "./gesture.js";

export { STATE, ATTRIBUTE } from "./framework.js";

export class Button extends Component {
  constructor() {
    super();
  }

  render() {
    this.root = (<div />).render();
  }
}
