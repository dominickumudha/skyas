import React from "react";
import { Label, FormGroup } from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../Common/CustomSelectInput";
import { Colxx } from "../Common/CustomBootstrap";
class DropDown extends React.Component {
  render() {

    return this.props.colSplit ? (
      <Colxx xxs={this.props.MobcolSplit} sm={this.props.colSplit}>
        <FormGroup
          className={
            this.props.formClassName ? this.props.formClassName : "form-group"
          }
        >{this.props.className.includes("filters") ?
          <Label className="">
            {this.props.label}
          </Label> : <Label className="requiredField">
            {this.props.label}
          </Label>}
          <Select
            styles={{
              // Fixes the overlapping problem of the component
              menu: provided => ({ ...provided, zIndex: 9999 })
            }}
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            isMulti={this.props.isMulti}
            options={this.props.options}
            isDisabled={this.props.isDisabled}
            isClearable={this.props.isClearable}
            isSearchable={this.props.isSearchable ? true : false}
            value={this.props.value}
            onChange={(entity, action) => {
              if (action === "clear") {
                this.props.ClearAction();
              } else {
                this.props.Action(entity);
              }
            }}
            onInputChange={(e) => {
              this.props.onInputChange && this.props.onInputChange(e);
            }}
            placeholder={this.props.placeholderText}
            noOptionsMessage={() => this.props.emptyText}
          />
          <span className="text-semi-muted">{this.props.grayText}</span>
          {this.props.errors && (
            <div className="invalid-feedback d-block">{this.props.errors}</div>
          )}
        </FormGroup>
      </Colxx>
    ) : (
        <FormGroup
          className={
            this.props.formClassName ? this.props.formClassName : "form-group"
          }
        >
          {this.props.className.includes("filters") ?
            <Label className="">
              {this.props.label}
            </Label> : <Label className="requiredField">
              {this.props.label}
            </Label>}
          <Select
            styles={{
              // Fixes the overlapping problem of the component
              menu: provided => ({ ...provided, zIndex: 9999 })
            }}
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            isMulti={this.props.isMulti}
            options={this.props.options}
            isDisabled={this.props.isDisabled}
            isClearable={this.props.isClearable}
            isSearchable={this.props.isSearchable ? true : false}
            value={this.props.value}
            onChange={(entity, action) => {
              if (action === "clear") {
                this.props.ClearAction();
              } else {
                this.props.Action(entity);
              }
            }}
            onInputChange={(e) => {
              this.props.onInputChange && this.props.onInputChange(e);
            }}
            placeholder={this.props.placeholderText}
            noOptionsMessage={() => this.props.emptyText}
          />
          <span className="text-semi-muted">{this.props.grayText}</span>
          {this.props.errors && (
            <div className="invalid-feedback d-block">{this.props.errors}</div>
          )}
        </FormGroup>
      );
  }
}

export default DropDown;
