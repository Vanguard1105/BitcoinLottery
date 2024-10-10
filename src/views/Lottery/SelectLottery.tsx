import Card from '@/components/ui/Card'
import Dropdown from '@/components/ui/Dropdown'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Tabs from '@/components/ui/Tabs'
import ProgressionBar from './ProgressionBar'
import Dialog from '@/components/ui/Dialog'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import type { LotteryData, DateOptions } from './types/SelectLottery'
import { TypeAttributes } from '@/components/ui/@types/common';
import { Button } from '@/components/ui/Button';
import { HiOutlinePlusSm } from "react-icons/hi";
import { HiOutlineDotsVertical } from "react-icons/hi";
const { TabNav, TabList, TabContent } = Tabs
const LotteryDatas: LotteryData[] = [
  {
    name: "Lottery_20241009_154808",
    ticket_price: 10,
    total_ticket: 1000,
    description: "This is our first lottery",
    sold_ticket: 450,
    start_time: new Date("2024-10-08T12:00:00"),
    buy_time: new Date("2024-10-15T10:00:00"),
    end_time: new Date("2024-12-01T10:00:00"),
    winner: "vanguard1105"
  },
  {
    name: "Lottery_20241009_154808",
    ticket_price: 10,
    total_ticket: 500,
    description: "This is our first lottery",
    sold_ticket: 500,
    start_time: new Date("2024-10-01T14:00:00"),
    buy_time: new Date("2024-10-15T14:00:00"),
    end_time: new Date("2024-11-01T14:00:00"),
    winner: "vanguard1105"

  },
  {
    name: "Lottery_20241009_154808",
    ticket_price: 5,
    total_ticket: 200,
    sold_ticket: 100,
    description: "This is our first lottery",
    start_time: new Date("2024-11-20T09:00:00"),
    buy_time: new Date("2024-11-25T09:00:00"),
    end_time: new Date("2024-11-30T09:00:00"),
    winner: "vanguard1105"
  },
  {
    name: "Lottery_20241009_154808",
    ticket_price: 10,
    total_ticket: 1500,
    sold_ticket: 350,
    description: "This is our first lottery",
    start_time: new Date("2024-12-05T12:00:00"),
    buy_time: new Date("2024-12-10T12:00:00"),
    end_time: new Date("2024-01-01T12:00:00"),
    winner: "vanguard1105"
  },
  {
    name: "Lottery_20241009_154808",
    description: "This is our first lottery",
    ticket_price: 10,
    total_ticket: 750,
    sold_ticket: 600,
    start_time: new Date("2024-10-07T16:00:00"),
    buy_time: new Date("2024-10-08T11:00:00"),
    end_time: new Date("2024-12-02T16:00:00"),
    winner: "vanguard1105"
  }
];

const dateOptions: DateOptions = {
  month: 'short',   // "Oct"
  day: 'numeric',   // "1"
  hour: '2-digit',  // "12"
  minute: '2-digit',
  hourCycle: 'h23',
};

const Lottery = () => {
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date());
  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false)
  const openDeleteDialog = () => {
    setDeleteDialogIsOpen(true)
  }

  const deleteDialogClose = () => {
    console.log('onDialogClose')
    setDeleteDialogIsOpen(false)
  }

  const deleteDialogOk = () => {
    console.log('onDialogOk')
    setDeleteDialogIsOpen(false)
  }
  const openNotification = (type: TypeAttributes.Status, title: string) => {
    toast.push(<Notification type={type} title={title} className='z-50' />, {
      placement: 'top-center',
    })
  }
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const [HideLotteryCard, setHideLotteryCard] = useState(false);
  const getStatus = (buy_time: Date, end_time: Date) => {
    if (currentTime > end_time) {
      return { statusText: 'Ended', color: '#F28B82' };
    } else if (currentTime > buy_time) {
      return { statusText: 'Pending', color: '#FFCC80' };
    } else {
      return { statusText: 'Active', color: '#A5D6A7' };
    }
  };
  const createLottery = () => {
    navigate('/create-lottery')
  }
  const Toogle: any = <span><HiOutlineDotsVertical /></span>

  return (
    <div>
      <Tabs defaultValue="tab1">
        <TabList className='top-0 z-40 flex flex-col pt-3 bg-[rgb(17,24,39)] border-[rgb(17,24,39)]' style={{ position: "sticky" }}>
          <div className='flex flex-row justify-around w-full'>
            <p className='text-[25px] pr-5 start-0 text-white'>Lotteries</p>
            <Button variant='solid' size='sm' className='px-5' icon={<HiOutlinePlusSm />} onClick={createLottery}> Create</Button>
          </div>
          <div className='flex flex-row justify-between items-end'>
            <TabNav value="tab1">Ongoing</TabNav>
            <TabNav value="tab2">Pending</TabNav>
            <TabNav value="tab3">Closed</TabNav>
          </div>
        </TabList>
        <div className="p-0">
          <TabContent value="tab1">
            {!HideLotteryCard &&
              <div className="my-4" id="lottery">
                {LotteryDatas.map((LotteryData: LotteryData, key) => {
                  const { statusText, color } = getStatus(LotteryData.buy_time, LotteryData.end_time);
                  return (statusText == "Active" &&
                    <Card className='my-2 mx-4 text-[12px]' bodyClass='p-3' key={key}>
                      <div className="grid gap-x-4 grid-cols-12">
                        <div className="sm:my-0 col-span-12 sm:col-span-2  lg:col-span-3 md:flex">
                          <div className="flex flex-col">
                            <div className='flex flex-row justify-between'>
                              <p className="font-bold">
                                {LotteryData.name}
                              </p>
                              <div className='flex flex-row'>
                                <span style={{ color: color }} className='pr-3'>{statusText}</span>
                                <div>
                                  <Dropdown renderTitle={Toogle} placement='middle-end-top'>
                                    <Dropdown.Item eventKey="a">Show Tickets</Dropdown.Item>
                                    <Dropdown.Item eventKey="b" onClick={openDeleteDialog}>Delete Lottery</Dropdown.Item>
                                  </Dropdown>
                                </div>
                              </div>
                            </div>
                            <p className='py-1'>{LotteryData.description}</p>
                            <div className='text-[12px]'><span>Start time:</span><span className='pr-5'>{LotteryData.start_time.toISOString().replace('T', ' ').slice(0, 19)}</span></div>
                            <div><span>End time :</span><span>{LotteryData.buy_time.toISOString().replace('T', ' ').slice(0, 19)}</span></div>
                            <div>
                              <span>Buy time :</span><span>{LotteryData.end_time.toISOString().replace('T', ' ').slice(0, 19)}</span>
                            </div>
                          </div>
                          <div>
                            <span>Ticket Price: </span> <span className='pr-4'>${LotteryData.ticket_price}</span>
                            <span>Total Price: </span> <span>${LotteryData.sold_ticket * LotteryData.ticket_price}</span>
                          </div>
                        </div>
                        <div className="my-1 sm:my-0 col-span-12  lg:col-span-3 md:flex md:items-center flex flex-row">
                          <ProgressionBar progression={parseFloat((LotteryData.sold_ticket * 100 / LotteryData.total_ticket).toFixed(2))} />
                          <span className='text-[10px] pl-2'>({LotteryData.sold_ticket}/{LotteryData.total_ticket})</span>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            }
          </TabContent>
          <TabContent value="tab2">
            {!HideLotteryCard &&
              <div className="my-4" id="lottery">
                {LotteryDatas.map((LotteryData: LotteryData, key) => {
                  const { statusText, color } = getStatus(LotteryData.buy_time, LotteryData.end_time);
                  return (statusText == "Pending" &&
                    <Card className='my-2 mx-4 text-[12px]' bodyClass='p-3' key={key}>
                      <div className="grid gap-x-4 grid-cols-12">
                        <div className="sm:my-0 col-span-12 sm:col-span-2  lg:col-span-3 md:flex">
                          <div className="flex flex-col">
                            <div className='flex flex-row justify-between'>
                              <p className="font-bold">
                                {LotteryData.name}
                              </p>
                              <div className='flex flex-row'>
                                <span style={{ color: color }} className='pr-3'>{statusText}</span>
                                <div>
                                  <Dropdown renderTitle={Toogle} placement='middle-end-top'>
                                    <Dropdown.Item eventKey="a">Show Tickets</Dropdown.Item>
                                  </Dropdown>
                                </div>
                              </div>
                            </div>
                            <p className='py-1'>{LotteryData.description}</p>
                            <div className='text-[12px]'><span>Start time:</span><span className='pr-5'>{LotteryData.start_time.toISOString().replace('T', ' ').slice(0, 19)}</span></div>
                            <div><span>End time :</span><span>{LotteryData.buy_time.toISOString().replace('T', ' ').slice(0, 19)}</span></div>
                            <div>
                              <span>Buy time :</span><span>{LotteryData.end_time.toISOString().replace('T', ' ').slice(0, 19)}</span>
                            </div>
                          </div>
                          <div>
                            <span>Ticket Price: </span> <span className='pr-4'>${LotteryData.ticket_price}</span>
                            <span>Total Price: </span> <span>${LotteryData.sold_ticket * LotteryData.ticket_price}</span>
                          </div>
                        </div>
                        <div className="my-1 sm:my-0 col-span-12  lg:col-span-3 md:flex md:items-center flex flex-row">
                          <ProgressionBar progression={parseFloat((LotteryData.sold_ticket * 100 / LotteryData.total_ticket).toFixed(2))} />
                          <span className='text-[10px] pl-2'>({LotteryData.sold_ticket}/{LotteryData.total_ticket})</span>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            }
          </TabContent>
          <TabContent value="tab3">
            {!HideLotteryCard &&
              <div className="my-4" id="lottery">
                {LotteryDatas.map((LotteryData: LotteryData, key) => {
                  const { statusText, color } = getStatus(LotteryData.buy_time, LotteryData.end_time);
                  return (statusText == "Ended" &&
                    <Card className='my-2 mx-4 text-[12px]' bodyClass='p-3' key={key}>
                      <div className="grid gap-x-4 grid-cols-12">
                        <div className="sm:my-0 col-span-12 sm:col-span-2  lg:col-span-3 md:flex">
                          <div className="flex flex-col">
                            <div className='flex flex-row justify-between'>
                              <p className="font-bold">
                                {LotteryData.name}
                              </p>
                              <div className='flex flex-row'>
                                <span style={{ color: color }} className='pr-3'>{statusText}</span>
                                <div>
                                  <Dropdown renderTitle={Toogle} placement='middle-end-top'>
                                    <Dropdown.Item eventKey="a">Show Tickets</Dropdown.Item>
                                  </Dropdown>
                                </div>
                              </div>
                            </div>
                            <p className='py-1'>{LotteryData.description}</p>
                            <div className='text-[12px]'><span>Start time:</span><span className='pr-5'>{LotteryData.start_time.toISOString().replace('T', ' ').slice(0, 19)}</span></div>
                            <div><span>End time :</span><span>{LotteryData.buy_time.toISOString().replace('T', ' ').slice(0, 19)}</span></div>
                            <div>
                              <span>Buy time :</span><span>{LotteryData.end_time.toISOString().replace('T', ' ').slice(0, 19)}</span>
                            </div>
                          </div>
                          <div>
                            <span>Ticket Price: </span> <span className='pr-4'>${LotteryData.ticket_price}</span>
                            <span>Total Price: </span> <span>${LotteryData.sold_ticket * LotteryData.ticket_price}</span>
                          </div>
                          <div>
                            <span>Winner: </span> <span className='pr-4'>{LotteryData.winner}</span>
                          </div>
                        </div>
                        <div className="my-1 sm:my-0 col-span-12  lg:col-span-3 md:flex md:items-center flex flex-row">
                          <ProgressionBar progression={parseFloat((LotteryData.sold_ticket * 100 / LotteryData.total_ticket).toFixed(2))} />
                          <span className='text-[10px] pl-2'>({LotteryData.sold_ticket}/{LotteryData.total_ticket})</span>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            }
          </TabContent>
        </div>
      </Tabs>
      <Dialog isOpen={deleteDialogIsOpen} closable={false} className='mt-32 mx-5' portalClassName='!w-[200px]'>
        <p className='text-[16px]'>Do you really delete this lottery?</p>
        <div className="text-right mt-3 flex justify-around px-10">
          <Button
            className=""
            variant="plain"
            size='sm'
            onClick={deleteDialogClose}
          >
            Cancel
          </Button>
          <Button variant="solid" onClick={deleteDialogOk} size='sm'>
            Okay
          </Button>
        </div>
      </Dialog>
    </div>
  )
}

export default Lottery
