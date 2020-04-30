import React, {Component} from "react";
import {Session} from "bc-react-session";
import $ from "jquery";

import Keyword from "./Keyword";

var _ = require("lodash");

class KeywordsConfigList extends Component {
  constructor(props) {
    super(props);
    const {payload} = Session.get();

    this.state = {
      keywordsData: payload.config.keywords,
      showAddKeyword: false,
      showUnsavedChanges: false,
      showImport: false,
      showExport: "export",
      exportText: ""
    }

    this.addKeyword = this.addKeyword.bind(this);
    this.handleSaveConfig = this.handleSaveConfig.bind(this);
    this.handleConfigImport = this.handleConfigImport.bind(this);
    this.handleConfigExportJson = this.handleConfigExportJson.bind(this);
    this.handleDeleteKeyword = this.handleDeleteKeyword.bind(this);

    this.handleAutoreplyToggle = this.handleAutoreplyToggle.bind(this);

    this.handleAddKeywordOpen = this.handleAddKeywordOpen.bind(this);
    this.handleAddKeywordClose = this.handleAddKeywordClose.bind(this);

    this.setUnsavedChanges = this.setUnsavedChanges.bind(this);
    this.unsetUnsavedChanges = this.unsetUnsavedChanges.bind(this);

    this.handleImportOpen = this.handleImportOpen.bind(this);
    this.handleImportClose = this.handleImportClose.bind(this);

    this.setExportToButton = this.setExportToButton.bind(this);
    this.setExportToType = this.setExportToType.bind(this);
    this.setExportToText = this.setExportToText.bind(this);
  }

  handleAutoreplyToggle(keyword, newAutoreply) {
    let keywordsData = this.state.keywordsData;
    let index = _.indexOf(keywordsData, keyword);

    keyword.autoreply = newAutoreply;
    keywordsData[index] = keyword;

    this.setState({ keywordsData: keywordsData });
  }

  addKeyword() {
    let keywordsList = this.state.keywordsData;
    const keywordInput = $("#new-keyword").val();

    if (keywordInput.length < 1) {
      alert("The keyword/phrase must be at least 1 character long.");
      return;
    }

    // check for adding a duplicate
    let foundDuplicate = false;
    _.forEach(keywordsList, function(k) {
      if (k.keyword === keywordInput) {
        alert("The word or phrase you are trying to add already exists.");
        foundDuplicate = true;
        return false;
      }
    })
    if (foundDuplicate) return;

    const newKeyword = {
      autoreply: false,
      keyword: keywordInput,
      responses: []
    }
    keywordsList.push(newKeyword);
    this.setState({ keywordsData: keywordsList, showUnsavedChanges: true });

    this.handleAddKeywordClose();
  }

  handleSaveConfig() {
    const keywordsData = this.state.keywordsData;
    const {payload} = Session.get();
    Session.setPayload({
      config: {
        username:  payload.username,
        keywords: keywordsData
      }
    });
    this.setState({ showUnsavedChanges: false });
  }

  handleConfigImport() {
    const thisComp = this;
    let filename = $("#import-config").prop("files")[0].name;

    if (!/([.]xml)$/.test(filename) && !/([.]json)$/.test(filename)) {
      alert("Unsupported filetype. Please upload a JSON or XML file.");
      document.getElementById("import-config").value = "";
      return;
    }

    let fileReader = new FileReader();
    fileReader.onload = function () {
      let rawData = fileReader.result;
      let configObj;

      if (/([.]xml)$/.test(filename)) {
        console.log("Handle XML");
        document.getElementById("import-config").value = "";
        thisComp.setState({ showImport: false });
        return;
      } else if (/([.]json)$/.test(filename)) {
        configObj = JSON.parse(rawData);
      }
      document.getElementById("import-config").value = "";
      thisComp.setState({ keywordsData: configObj.keywords, showImport: false, showUnsavedChanges: true });
    };

    fileReader.readAsText($("#import-config").prop("files")[0]);
  }

  handleConfigExportJson() {
    const {payload} = Session.get();
    const configObj = payload.config;
    const config = JSON.stringify(configObj, null, 2);
    this.setState({ showExport: "text", exportText: config });
  }

  handleDeleteKeyword(keyword) {
    let keywordsData = this.state.keywordsData;
    _.remove(keywordsData, keyword);
    this.setState({ keywordsData: keywordsData, showUnsavedChanges: true });
  }

  handleAddKeywordOpen() {
    this.setState({ showAddKeyword: true });
  }

  handleAddKeywordClose() {
    this.setState({ showAddKeyword: false });
  }

  setUnsavedChanges() {
    this.setState({ showUnsavedChanges: true });
  }

  unsetUnsavedChanges() {
    this.setState({ showUnsavedChanges: false });
  }

  handleImportOpen() {
    this.setState({ showImport: true });
  }

  handleImportClose() {
    this.setState({ showImport: false });
  }

  setExportToButton() {
    this.setState({ showExport: "export" });
  }

  setExportToType() {
    this.setState({ showExport: "type" });
  }

  setExportToText() {
    this.setState({ showExport: "text" });
  }

  render() {
    const thisComp = this;

    let addKeywordElement;
    let unsavedChanges;
    let importConfig;
    let exportConfig;

    if (this.state.showAddKeyword) {
      addKeywordElement =
        <div className="add-keyword">
          <input type="text" id="new-keyword" placeholder="Add Keyword"></input>
          <button onClick={this.addKeyword}>Create</button>
          <button onClick={this.handleAddKeywordClose}>Cancel</button>
        </div>
    } else {
      addKeywordElement = <button onClick={this.handleAddKeywordOpen}>Add Keyword</button>
    }

    if (this.state.showUnsavedChanges) {
      unsavedChanges = <p className="unsaved-warning">Warning: you have unsaved changes to your config. Click 'Save Config' to save.</p>
    }

    const keywords = this.state.keywordsData;
    const keywordsList = keywords.map(function(k) {
      return(
        <Keyword keyword={k}
          handleAutoreplyToggle={thisComp.handleAutoreplyToggle}
          setUnsavedChanges={thisComp.setUnsavedChanges}
          unsetUnsavedChanges={thisComp.unsetUnsavedChanges}
          handleDeleteKeyword={thisComp.handleDeleteKeyword}
          key={k.keyword}/>
      )
    });

    if (this.state.showImport) {
      importConfig =
      <div className="import">
        <input type="file" id="import-config" onChange={this.handleConfigImport}></input>
        <button onClick={this.handleImportClose}>Cancel Import</button>
      </div>
    } else {
      importConfig = <button onClick={this.handleImportOpen}>Import</button>
    }

    if (this.state.showExport === "type") {
      exportConfig =
        <div className="export-types">
          <button onClick={this.handleConfigExportJson}>Export as JSON</button>
          <button>Export as XML</button>
          <button onClick={this.setExportToButton}>Cancel Export</button>
        </div>
    } else if (this.state.showExport === "export") {
      exportConfig = <button onClick={this.setExportToType}>Export</button>
    } else if (this.state.showExport === "text") {
      exportConfig =
      <div className="export-text">
        <button onClick={this.setExportToButton}>X</button>
        <textarea id="export-text" value={this.state.exportText} readOnly></textarea>
      </div>
    }

    return (
      <div className="keyword-config-list">
        <h2>Configure Keywords & Responses</h2>
        <div className="settings-top">
          <div className="save-add-buttons">
            <button onClick={this.handleSaveConfig}>Save Changes</button>
            {addKeywordElement}
          </div>
          <div className="import-export-buttons">
            {importConfig}
            {exportConfig}
          </div>
        </div>
        {unsavedChanges}
        <div className="keywords-list">
          {keywordsList}
        </div>
      </div>
    )
  }
}

export default KeywordsConfigList;
