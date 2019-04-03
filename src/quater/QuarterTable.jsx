import * as React from 'react'
import classnames from 'classnames'

class QuarterTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
  }
  setAndSelectValue = (value) => {
    this.setState({
      value,
    });
    this.props.onSelect(value);
  }
  chooseMonth = (month) => {
    const next = this.state.value.clone();
    next.month(month);
    this.setAndSelectValue(next);
  }
  quarters() {
    const quarters = [
      [
        { title: 'Quarter 1', content: 'Quarter 1', month: 0 },
        { title: 'Quarter 2', content: 'Quarter 2', month: 3 },
      ],
      [
        { title: 'Quarter 3', content: 'Quarter 3', month: 6 },
        { title: 'Quarter 4', content: 'Quarter 4', month: 9 },
      ]
    ];
    return quarters;
  }
  render() {
    const quarters = this.quarters();
    const {prefixCls, value} = this.props;
    const currentMonth = value.month();

    const quarterEls = quarters.map((row, index) => {
      const tds = row.map(quarterData => {
        const classNameMap = {
          [`${prefixCls}-cell`]: 1,
          [`${prefixCls}-selected-cell`]: quarterData.month <= currentMonth && quarterData.month + 2 >= currentMonth,
        };
        return (
          <td
            role="gridcell"
            title={quarterData.title}
            key={quarterData.content}
            onClick={() => this.chooseMonth(quarterData.month)}
            className={classnames(classNameMap)}
          >
            <a
              className={`${prefixCls}-quarter`}
            >
              {quarterData.content}
            </a>
          </td>);
      });
      return (<tr key={index} role="row">{tds}</tr>);
    });

    return (
      <table className={`${prefixCls}-table`} cellSpacing="0" role="grid">
        <tbody className={`${prefixCls}-tbody`}>
        {quarterEls}
        </tbody>
      </table>
    );
  }
}

export default QuarterTable;
