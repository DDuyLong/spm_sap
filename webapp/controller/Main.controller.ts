/* eslint-disable comma-dangle */
import DatePicker from "sap/m/DatePicker";
import Label from "sap/m/Label";
import MultiComboBox from "sap/m/MultiComboBox";
import SearchField from "sap/m/SearchField";
import Table from "sap/m/Table";
import FilterBar from "sap/ui/comp/filterbar/FilterBar";
import PersonalizableInfo from "sap/ui/comp/smartvariants/PersonalizableInfo";
import SmartVariantManagement from "sap/ui/comp/smartvariants/SmartVariantManagement";
import JSONModel from "sap/ui/model/json/JSONModel";
import View from "sap/ui/vk/View";
import { Fiter } from "spm/types/filterType";
import Base from "./Base.controller";

/**
 * @namespace spm.controller
 */

export default class Main extends Base {
  private view: View;
  private filterBar: FilterBar;
  private table: Table;
  private oSmartVariantManagement: SmartVariantManagement;
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

      dataTable: [
        {
          maPR: 1000559,
          DeleteID: "x",
          soLuong: 10,
          nhaMay: "Potoro",
          maPO: 366600,
          Detalis: "Show Details",
          NgayCapNhat: "02.04.2024",
        },
        {
          maPR: 1000560,
          DeleteID: "x",
          soLuong: 10,
          nhaMay: "Potoro",
          maPO: 366600,
          Detalis: "Show Details",
          NgayCapNhat: "02.04.2024",
        },
        {
          maPR: 1000561,
          DeleteID: "x",
          soLuong: 10,
          nhaMay: "Potoro",
          maPO: 366600,
          Detalis: "Show Details",
          NgayCapNhat: "02.04.2024",
        },
        {
          maPR: 1000561,
          DeleteID: "x",
          soLuong: 10,
          nhaMay: "Potoro",
          maPO: 366600,
          Detalis: "Show Details",
          NgayCapNhat: "02.04.2024",
        },
        {
          maPR: 1000563,
          DeleteID: "x",
          soLuong: 10,
          nhaMay: "Potoro",
          maPO: 366600,
          Detalis: "Show Details",
          NgayCapNhat: "02.04.2024",
        },
        {
          maPR: 1000563,
          DeleteID: "x",
          soLuong: 10,
          nhaMay: "Potoro",
          maPO: 366600,
          Detalis: "Show Details",
          NgayCapNhat: "02.04.2024",
        },
        {
          maPR: 1000563,
          DeleteID: "x",
          soLuong: 10,
          nhaMay: "Potoro",
          maPO: 366600,
          Detalis: "Show Details",
          NgayCapNhat: "02.04.2024",
        },
        {
          maPR: 1000563,
          DeleteID: "x",
          soLuong: 10,
          nhaMay: "Potoro",
          maPO: 366600,
          Detalis: "Show Details",
          NgayCapNhat: "02.04.2024",
        },
        {
          maPR: 1000563,
          DeleteID: "x",
          soLuong: 10,
          nhaMay: "Potoro",
          maPO: 366600,
          Detalis: "Show Details",
          NgayCapNhat: "02.04.2024",
        },
        {
          maPR: 1000563,
          DeleteID: "x",
          soLuong: 10,
          nhaMay: "Potoro",
          maPO: 366600,
          Detalis: "Show Details",
          NgayCapNhat: "02.04.2024",
        },
        {
          maPR: 1000563,
          DeleteID: "x",
          soLuong: 10,
          nhaMay: "Potoro",
          maPO: 366600,
          Detalis: "Show Details",
          NgayCapNhat: "02.04.2024",
        },
        {
          maPR: 1000563,
          DeleteID: "x",
          soLuong: 10,
          nhaMay: "Potoro",
          maPO: 366600,
          Detalis: "Show Details",
          NgayCapNhat: "02.04.2024",
        },
        {
          maPR: 1000563,
          DeleteID: "x",
          soLuong: 10,
          nhaMay: "Potoro",
          maPO: 366600,
          Detalis: "Show Details",
          NgayCapNhat: "02.04.2024",
        },
        {
          maPR: 1000563,
          DeleteID: "x",
          soLuong: 10,
          nhaMay: "Potoro",
          maPO: 366600,
          Detalis: "Show Details",
          NgayCapNhat: "02.04.2024",
        },
        {
          maPR: 1000563,
          DeleteID: "x",
          soLuong: 10,
          nhaMay: "Potoro",
          maPO: 366600,
          Detalis: "Show Details",
          NgayCapNhat: "02.04.2024",
        },
      ],
    };

    const dataModel = new JSONModel(data);
    this.getView()?.setModel(dataModel);

    //get view
    this.filterBar = <FilterBar>this.getView()?.byId("filterbar");
    this.table = <Table>this.getView()?.byId("table");
    this.expandedLabel = <Label>this.getView()?.byId("expandedLabel");
    this.snappedLabel = <Label>this.getView()?.byId("snappedLabel");
    //chưa hiểu
    this.getFiltersWithValues = this.getFiltersWithValues.bind(this);

    this.filterBar.registerGetFiltersWithValues(this.getFiltersWithValues());

    this.oSmartVariantManagement = <SmartVariantManagement>(
      this.getView()?.byId("svm")
    );
    let persInfo = new PersonalizableInfo({
      type: "filterBar",
      keyName: "persistencyKey",
      dataSource: "",
      control: this.filterBar,
    });
    this.oSmartVariantManagement.addPersonalizableControl(persInfo);
    this.oSmartVariantManagement.initialise(() => {}, this.filterBar);
  }

  public getFiltersWithValues(): void {}

  public onSelectionChange(event: any) {
    this.oSmartVariantManagement.currentVariantSetModified(true);
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
  }

  private updateLabelsAndTable(): void {
    this.expandedLabel.setText(this.getFormattedSummaryTextExpanded());
    this.snappedLabel.setText(this.getFormattedSummaryText());
    this.table.setShowOverlay(true);
  }
}
