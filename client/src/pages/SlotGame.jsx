import React, { useState } from 'react';
import axios from 'axios';

const SlotGame = ({ token, user, logout }) => {
  const [slots, setSlots] = useState(['❓', '❓', '❓']);
  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState(user?.balance ?? 0);
  const [spinning, setSpinning] = useState(false);

  const symbols = ['🍒', '🍋', '🍇', '🔔', '💎', '7️⃣'];

  const updateBalance = async (amount) => {
    try {
      await axios.post('http://localhost:3000/api/user/update-balance', {
        username: user?.username, amount
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error('Update saldo gagal:', err);
    }
  };

  const spin = async () => {
    if (balance < 100 || spinning) return;
    setSpinning(true);
    setMessage('');
    setBalance(prev => prev - 100);
    await updateBalance(-100);

    const result = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)]
    ];

    setTimeout(() => {
      setSlots(result);
      checkWin(result);
      setSpinning(false);
    }, 800);
  };

  const checkWin = async (result) => {
    const [a, b, c] = result;
    let reward = 0;
    let msg = '💀 Zonk!';

    if (a === b && b === c) {
      reward = 1000; msg = '🎉 Jackpot +1000!';
    } else if (a === b || b === c || a === c) {
      reward = 300; msg = '🥈 Menang kecil +300!';
    }

    if (reward > 0) {
      await updateBalance(reward);
      setBalance(prev => prev + reward);
    }

    setMessage(msg);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Slot Game</h2>
        <button onClick={logout} className="bg-red-500 text-white px-2 py-1 rounded">Logout</button>
      </div>
      <p>User: <strong>{user?.username}</strong></p>
      <p>Saldo: <strong>{balance}</strong></p>
      <div className="text-3xl my-4 space-x-4">{slots.map((s, i) => <span key={i}>{s}</span>)}</div>
      <button onClick={spin} disabled={spinning || balance < 100} className="bg-blue-600 text-white px-4 py-2 rounded">{spinning ? 'Spinning...' : '🎰 SPIN'}</button>
      {message && <p className="mt-2 font-semibold">{message}</p>}
    </div>
  );
};

export default SlotGame;