const React = require('react');
const {useState} = React;
const Body = require('./Body');
require('./calendar.css');

const Header = () =>{
    const [currentDate, setCurrentDate] = useState(new Date());

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth()+1;

    const goToPrevMonth = () => {
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        setCurrentDate(previousMonth);
    };

    const goToNextMonth = () => {
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
        setCurrentDate(nextMonth);
    };
    
      
    return(
        <div className="calendar">
            <div className='header'>
                <span id='yearArea'>{currentYear}년</span>
                <div id ='monthArea'>
                    <button id ='preBtn'onClick={goToPrevMonth}>&lsaquo;</button>
                    <span id='currentMont'>{currentMonth}월</span>
                    <button id ='nextBtn'onClick={goToNextMonth}>&rsaquo;</button>
                </div>
            </div>
            <Body currentDate={currentDate}/>
        </div>
    );

}

module.exports = Header;