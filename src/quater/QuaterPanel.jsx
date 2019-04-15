import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import QuarterTable from './QuarterTable';
import MonthTable from '../month/MonthTable'

import LeftArrow from '../icons/LeftArrow';
import RightArrow from '../icons/RightArrow';

function goYear(direction) {
  const value = this.state.value.clone();
  value.add(direction, 'year');
  this.setState({
    value,
  });
}

export default class QuarterPanel extends React.Component {
  constructor(props) {
    super(props);
    this.prefixCls = `${props.rootPrefixCls}-quarter-panel`;
    this.state = {
      value: props.value || props.defaultValue,
    };
    this.nextYear = goYear.bind(this, 1);
    this.previousYear = goYear.bind(this, -1);
  }

  setValue = (value) => {
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
  }
  setAndSelectValue = (value) => {
    this.setValue(value);
    this.props.onSelect(value);
  }

  static getDerivedStateFromProps(nextProps) {
    let newState = {};

    if ('value' in nextProps) {
      newState = {
        value: nextProps.value,
      };
    }

    return newState;
  }

  render() {
    const props = this.props;
    const value = this.state.value;
    const { locale, renderFooter } = props;
    const currentYear = value.year();
    const prefixCls = this.prefixCls;
    const footer = renderFooter && renderFooter('quarter');

    return (
      <div className={this.prefixCls}>
        <div>
          <div className={`${prefixCls}-header`}>
            <a
              className={`${prefixCls}-prev-year-btn`}
              role="button"
              onClick={this.previousYear}
              title={locale.previousYear}
            >
              <LeftArrow />
            </a>
            <a
              className={`${prefixCls}-decade-select`}
              role="button"
              onClick={props.onYearPanelShow}
              title={locale.decadeSelect}
            >
              <span className={`${prefixCls}-year-select-content`}>
                {currentYear}
              </span>
              <span className={`${prefixCls}-year-select-arrow`}>x</span>
            </a>

            <a
              className={`${prefixCls}-next-year-btn`}
              role="button"
              onClick={this.nextYear}
              title={locale.nextYear}
            >
              <RightArrow />
            </a>
          </div>
          <div className={`${prefixCls}-body`}>
            <QuarterTable
              disabledDate={props.disabledDate}
              onSelect={this.setAndSelectValue}
              locale={locale}
              value={value}
              prefixCls={prefixCls}
            />
          </div>

          {footer && (
            <div className={`${prefixCls}-footer`}>
              {footer}
            </div>)}
        </div>
      </div>);
  }
}

QuarterPanel.propTypes = {
  rootPrefixCls: PropTypes.string,
  value: PropTypes.object,
  defaultValue: PropTypes.object,
  renderFooter: PropTypes.func,
};

QuarterPanel.defaultProps = {
  onSelect() {
  },
};
