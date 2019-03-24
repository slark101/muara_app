import React,{Component} from 'react';
import dateFns from 'date-fns';
import './Calendar.css';
import { fsync } from 'fs';


class Calendar extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date(),
        };
    }

    countKajianForDate = (date)=>{
        let count = 0;
        for (let day of this.props.countKajian){
            if(dateFns.isSameDay(date,day))count+=1;
        }
        return count
    }

    renderHeader(){
        const idLocale = require('date-fns/locale/id')
        const DateFormat = 'MMMM YYYY';
        return (
            <div className='header calendar-row flex-middle'>
                <div className='calendar-col calendar-col-start'>
                    <div className='icon' onClick={this.prevMonth}>chevron_left</div>
                </div>
                <div className='calendar-col calendar-col-center'>
                    <span>
                        {dateFns.format(this.state.currentMonth,DateFormat, {locale:idLocale})}
                    </span>
                </div>
                <div className='calendar-col calendar-col-end' onClick={this.nextMonth}>
                    <div className='icon'>chevron_right</div>
                </div>
            </div>
        );
    }
    renderDays(){
        const idLocale = require('date-fns/locale/id')
        const dateFormat = 'dddd';
        const days = [];
        let startDate = dateFns.startOfWeek(this.state.currentMonth);

        for (let i=0;i<7;i++){
            days.push(
                <div className='calendar-col calendar-col-center' key={i}>
                    {dateFns.format(dateFns.addDays(startDate,i),dateFormat,{locale:idLocale})}
                </div>
            );
        }
        return <div className='days calendar-row'>{days}</div>;
    }
    renderCells(){
        const {currentMonth,selectedDate} = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = 'D';
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = '';

        while (day<=endDate){
            for(let i=0;i<7;i++){
                formattedDate = dateFns.format(day,dateFormat);
                const num_kajian = this.countKajianForDate(day);
                const cloneDay = day;
                days.push(
                    <div 
                        className={`calendar-col cell ${!dateFns.isSameMonth(day,monthStart)?
                        'disabled':dateFns.isSameDay(day,selectedDate)?'selected':''}`}
                        key={day}
                        onClick={()=>this.onDateClick(dateFns.parse(cloneDay))}
                    >
                        <span className='number'>{formattedDate}</span>
                        <span className='num_kajian'>
                            {num_kajian>0?num_kajian:''}
                        </span>
                        {/* <span className='bg'>{formattedDate}</span> */}
                    </div>
                );
                day = dateFns.addDays(day,1)
            }
            rows.push(
                <div className='calendar-row' key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className='body'>{rows}</div>
    }

    onDateClick = day => {
        this.setState({
            selectedDate:day
        });
        this.props.changeDates(day)
    };
    nextMonth = () => {
        this.setState({
            currentMonth:dateFns.addMonths(this.state.currentMonth,1)
        });
    };
    prevMonth = () => {
        this.setState({
            currentMonth:dateFns.subMonths(this.state.currentMonth,1)
        })
    };

    render(){
      return (
        <div className='base-calendar'>
            <div className='base-body'>
                <div className='calendar'>
                    {this.renderHeader()}
                    {this.renderDays()}
                    {this.renderCells()}
                </div>
            </div>
        </div>
      );
    }
  }

export default Calendar;