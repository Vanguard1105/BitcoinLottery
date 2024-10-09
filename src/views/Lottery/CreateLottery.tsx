import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import getCurrentFormattedTime from './GetTime'
import { useNavigate } from 'react-router-dom';
import DatePicker from '@/components/ui/DatePicker'
import { createLottery, useAppDispatch } from './store'
import { useEffect, useState } from 'react'
const CreateLottery = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [startTime, setStartTime] = useState<Date | null>(new Date())
  const [endTime, setEndTime] = useState<Date | null>(new Date())
  const [buyTime, setBuyTime] = useState<Date | null>(new Date())
  const [description, setDescription] = useState<string>("")
  const [ticketPrice, setTicketPrice] = useState<string>("")
  const [totalTicket, setTotalTicket] = useState<string>("")
  const now = getCurrentFormattedTime()
  const [invalidDescription, setInvalidDescription] = useState(false)
  const [invalidTicketPrice, setInvalidTicketPrice] = useState(false)
  const [invalidTotalTicket, setInvalidTotalTicket] = useState(false)
  const create = () => {
    const lottery = {
      name: "lottery" + now,
      description: description,
      ticketPrice: ticketPrice,
      totalTicket: totalTicket,
      startTime: startTime,
      buyTime: buyTime,
      endTime: endTime
    }
    dispatch(createLottery(lottery))
    navigate('/create-lottery')

  }
  const validate = () => {
    setInvalidDescription(false); setInvalidTicketPrice(false); setInvalidTotalTicket(false);
    description.trim() == "" && setInvalidDescription(true)
    totalTicket.trim() == "" && setInvalidTotalTicket(true)
    ticketPrice.trim() == "" && setInvalidTicketPrice(true)
    description.trim() && totalTicket.trim() && ticketPrice.trim() && create()
  }
  return (
    <div className='flex justify-center'>
      <div className='flex my-10 flex-col'>
        <div><span className='px-3 pr-12'>Name:</span><Input placeholder={`Lottery_${now}`} className='w-60 my-2' size='sm' disabled /></div>
        <div className='flex items-start'>
          <span className='px-3 pr-[10px] pt-2'>Description:</span>
          <Input
            textArea
            invalid={invalidDescription}
            value={description}
            placeholder="Please Enter Lottery Description"
            className='w-60 h-[30px] my-2'
            size='sm'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div><span className='pl-3 pr-2'>Ticket Price:</span>
          <Input
            type='number'
            invalid={invalidTicketPrice}
            placeholder="Please Enter Ticket Price"
            value={ticketPrice} className='w-60 my-2'
            size='sm'
            onChange={(e) => setTicketPrice(e.target.value)}
          />
        </div>
        <div><span className='pl-3 pr-0.5'>Total Tickets:</span>
          <Input
            type='number'
            invalid={invalidTotalTicket}
            placeholder="Please Enter Number Of Tickets"
            value={totalTicket} className='w-60 my-2'
            size='sm'
            onChange={(e) => setTotalTicket(e.target.value)}
          />
        </div>
        <div className='flex items-center my-2'>
          <span className='pl-3 pr-[14px]'>Start Time :</span>
          <DatePicker.DateTimepicker
            placeholder="Pick a date & time"
            className="w-60"
            value={startTime}
            inputFormat="YYYY-MM-DD T HH:mm:ss"
            onChange={setStartTime}
            minDate={new Date()}
            size='sm'
          />
        </div>
        <div className='flex items-center my-2 pl-3'>
          <span className='pr-5'>End Time :</span>
          <DatePicker.DateTimepicker
            placeholder="Pick a date & time"
            className="w-60"
            value={endTime}
            inputFormat="YYYY-MM-DD T HH:mm:ss"
            onChange={setEndTime}
            minDate={startTime ? startTime : new Date()}
            size='sm'
          />
        </div>
        <div className='flex items-center my-2 pl-3'>
          <span className='pr-5'>Buy Time :</span>
          <DatePicker.DateTimepicker
            placeholder="Pick a date & time"
            className="w-60"
            value={buyTime}
            inputFormat="YYYY-MM-DD T HH:mm:ss"
            onChange={setBuyTime}
            minDate={endTime ? endTime : new Date()}
            size='sm'
          />
        </div>
        <Button variant='solid' className='my-4' onClick={validate}>
          Create Lottery
        </Button>
      </div>
    </div>
  )
}

export default CreateLottery

