import React from 'react';
import axios from 'axios'
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);

class Cal extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
          events: [],
    	}
    }
    convertDate = (date) => {
    return moment.utc(date).toDate()
  }

  	  componentDidMount() {


    axios.get('http://localhost:3000/members')
      .then(response => {
        console.log(response.data);
        let appointments = response.data;
        
        for (let i = 0; i < appointments.length; i++) {
          
          appointments[i].start_time = this.convertDate(appointments[i].start_time)
          appointments[i].end_time = this.convertDate(appointments[i].end_time)
          
        }

        this.setState({
          events:appointments
        })
  
      })
      .catch(function (error) {
        console.log(error);
      });
  }

    render() {
    	const { events } = this.state
        return (
           <>
       		<div style={{ height: 500 }}>
                <Calendar localizer={localizer} events={events} 
                step={30}
	            defaultView='week'
	            views={['month','week','day']}
	            startAccessor="start_time"
      			endAccessor="end_time"
	            />
	            </div>
               </>
            
        );
    }
}

export default Cal;