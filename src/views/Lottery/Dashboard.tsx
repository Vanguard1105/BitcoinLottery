import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import GrowShrinkTag from '@/components/shared/GrowShrinkTag'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type Wallet = {
  icon: string;
  symbol: string;
  name: string;
  growshrink: number;
};
const walletType: Wallet[] = [
  { icon: "/img/thumbs/bitcoin.png", symbol: "BTC", name: "Bitcoin", growshrink: 16.7 },
  { icon: '/img/thumbs/ethereum.png', symbol: 'ETH', name: 'Ethereum', growshrink: -8.3, },
  { icon: '/img/thumbs/solana.png', symbol: 'SOL', name: 'Solana', growshrink: 4.9, },
  { icon: '/img/thumbs/solana.png', symbol: 'SOL', name: 'Solana', growshrink: 4.9, },
];
const Dashboard = () => {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(false)
  const handleCardClick = (id: number) => {
    navigate(`/select-lottery/${id}`)
  }
  const handleNewClick = () => {
    navigate('/create-lottery')
  }
  return (
    <>
      <h3 className='text-center pt-[100px]'>welcome luckyray0314</h3>

      <div className='flex justify-center' onClick={handleNewClick}>
        <Button className="absolute mr-2 mb-2 bottom-[80px]" variant="solid" color="blue-600">
          New Lottery
        </Button>
      </div>

    </>
  )
}
export default Dashboard