import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import Model from "sap/ui/model/Model";

/**
 * @namespace spm.controller
 */
export default class Base extends Controller {
  public getModel<t = JSONModel>(name?: string) {
    return this.getView()?.getModel(name) as t;
  }

  public setModel(model: Model, name: string) {
    return this.getView()?.setModel(model, name);
  }
}
