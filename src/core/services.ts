import DIContainer from "../utils/dicontainer";

export class BaseService {
  public container: DIContainer = <any>null;

  constructor() {}

  _boot() {}

  setContainer(container: DIContainer) {
    this.container = container;
    return this;
  }

  protected get events() {
    return this.container.events;
  }
}
