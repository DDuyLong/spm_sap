import DatePicker from "sap/m/DatePicker";
import Label from "sap/m/Label";
import MultiComboBox from "sap/m/MultiComboBox";
import SearchField from "sap/m/SearchField";
import Table from "sap/m/Table";
import FilterBar, {
  FilterBar$FilterChangeEventParameters,
} from "sap/ui/comp/filterbar/FilterBar";
import PersonalizableInfo from "sap/ui/comp/smartvariants/PersonalizableInfo";
import SmartVariantManagement from "sap/ui/comp/smartvariants/SmartVariantManagement";
import UI5Date from "sap/ui/core/date/UI5Date";
import JSONModel from "sap/ui/model/json/JSONModel";
import { dataFilter, Fiter } from "spm/types/filterType";
import Base from "./Base.controller";
import FilterGroupItem from "sap/ui/comp/filterbar/FilterGroupItem";

/**
 * @namespace spm.controller
 */

export default class Main extends Base {
  private filterBar: FilterBar;
  private table: Table;
  private smartVariantManagement: SmartVariantManagement;
  private expandedLabel: Label;
  private snappedLabel: Label;

  public onInit(): void {
    const data = {
      select: [
        {
          key: 1,
          name: "x",
        },
        {
          key: 2,
          name: "",
        },
      ],
    };
    const dataModel = new JSONModel(data);
    this.getView()?.setModel(dataModel);

    this.fetchData = this.fetchData.bind(this);
    this.applyData = this.applyData.bind(this);
    this.getFiltersWithValues = this.getFiltersWithValues.bind(this);

    //get view
    this.smartVariantManagement = <SmartVariantManagement>(
      this.getView()?.byId("svm")
    );
    this.filterBar = <FilterBar>this.getView()?.byId("filterbar");
    this.table = <Table>this.getView()?.byId("table");
    this.expandedLabel = <Label>this.getView()?.byId("expandedLabel");
    this.snappedLabel = <Label>this.getView()?.byId("snappedLabel");
    this.getFiltersWithValues = this.getFiltersWithValues.bind(this);
    this.filterBar.registerFetchData(this.fetchData);
    // this.filterBar.registerApplyData(this.applyData);
    this.filterBar.registerGetFiltersWithValues(this.getFiltersWithValues);

    let persInfo = new PersonalizableInfo({
      type: "filterBar",
      keyName: "persistencyKey",
      dataSource: "",
      control: this.filterBar,
    });
    this.smartVariantManagement.addPersonalizableControl(persInfo);
    this.smartVariantManagement.initialise(() => {}, this.filterBar);
  }


  public fetchData = (): dataFilter[] => {

    const aData = <dataFilter[]>(
      
      this.filterBar.getAllFilterItems(true).reduce((aResult, oFilterItem) => {

        aResult.push({
          groupName: oFilterItem.getGroupName(),
          fieldName: oFilterItem.getName(),
          fieldData: oFilterItem.getControl().getSelectedKeys(),
        });

        

        return aResult;
      }, [])
    );
    
    return aData;
  }

  public applyData(aData: dataFilter[]) {
    aData.forEach((oDataObject: dataFilter) => {
      const control = this.filterBar.determineControlByName(
        oDataObject.fieldName,
        oDataObject.groupName
      );
      if (control?.isA<DatePicker>("sap.m.DatePicker")) {
        control.setDateValue(oDataObject.fieldData as Date | UI5Date);
      } else if (control?.isA<SearchField>("sap.m.SearchField")) {
        control.setValue(oDataObject.fieldData as string);
      } else if (control?.isA<MultiComboBox>("sap.m.MultiComboBox")) {
        control.setSelectedKeys(oDataObject.fieldData as string[]);
      }
    });
  }

  public getFiltersWithValues = (): FilterGroupItem[] => {
    let filtersWithValues = this.filterBar
      .getFilterGroupItems()
      .reduce((acc, filterGroupItem) => {
        let control = filterGroupItem.getControl();
        if (control) {
          if (
            control?.isA<DatePicker>("sap.m.DatePicker") &&
            control.getDateValue()
          ) {
            acc.push(filterGroupItem as never);
          } else if (
            control?.isA<SearchField>("sap.m.SearchField") &&
            control.getValue()
          ) {
            acc.push(filterGroupItem as never);
          } else if (
            control?.isA<MultiComboBox>("sap.m.MultiComboBox") &&
            control.getSelectedKeys().length > 0
          ) {
            acc.push(filterGroupItem as never);
          }
        }

        return acc;
      }, []);

    return filtersWithValues;
  }

  public onChangeSelect(event: FilterBar$FilterChangeEventParameters) {
    this.smartVariantManagement.currentVariantSetModified(true);
    this.filterBar.fireFilterChange(event);
  }

  //nút go
  public onSearch(): void {
    const { filters, inputValues } = this.filterBar
      .getFilterGroupItems()
      .reduce<Fiter>(
        (acc, filterGroupItem) => {
          const control = filterGroupItem.getControl();
          const name = filterGroupItem.getName();
          if (control?.isA<DatePicker>("sap.m.DatePicker")) {
            const valueDate = control.getDateValue();
            acc.inputValues[name] = valueDate;
          } else if (control?.isA<SearchField>("sap.m.SearchField")) {
            const valueSearch = control.getValue();
            acc.inputValues[name] = valueSearch;
          } else if (control?.isA<MultiComboBox>("sap.m.MultiComboBox")) {
            const aSelectedKeys = control.getSelectedKeys();
            acc.inputValues[name] = aSelectedKeys;
          }
          return acc;
        },
        {
          filters: [],
          inputValues: {},
        }
      );
    console.log(inputValues);
  }

  //set text
  // thay đổi bộ lọc
  public onFilterChange(): void {
    this.updateLabelsAndTable();
  }

  public onAfterVariantLoad() {
    this.updateLabelsAndTable();
  }

  public getFormattedSummaryText() {
    let filtersWithValues = this.filterBar.retrieveFiltersWithValues();

    if (filtersWithValues.length === 0) {
      return "No filters active";
    }

    if (filtersWithValues.length === 1) {
      return (
        filtersWithValues.length +
        " filter active: " +
        filtersWithValues.join(", ")
      );
    }

    return (
      filtersWithValues.length +
      " filters active: " +
      filtersWithValues.join(", ")
    );
  }

  public getFormattedSummaryTextExpanded() {
    let filtersWithValues = this.filterBar.retrieveFiltersWithValues();
    if (filtersWithValues.length === 0) {
      return "No filters active";
    }

    let text = filtersWithValues.length + "filters active";
    let aNonVisibleFiltersWithValues =
      //@ts-ignore
      this.filterBar.retrieveNonVisibleFiltersWithValues();

    if (filtersWithValues.length === 1) {
      text = filtersWithValues.length + "filter active";
    }

    if (
      aNonVisibleFiltersWithValues &&
      aNonVisibleFiltersWithValues.length > 0
    ) {
      text += " (" + aNonVisibleFiltersWithValues.length + " hidden)";
    }

    return text;
  }

  private updateLabelsAndTable(): void {
    this.expandedLabel.setText(this.getFormattedSummaryTextExpanded());
    this.snappedLabel.setText(this.getFormattedSummaryText());
    this.table.setShowOverlay(true);
  }
}
