import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, CreditCard, Shield } from 'lucide-react'

export default function CheckoutScreen({ onNext, onBack }) {
  const [cardNum, setCardNum] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')

  const formatCard = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2)
    return digits
  }

  const isValid = cardNum.replace(/\s/g, '').length === 16 && expiry.length === 5 && cvv.length >= 3

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
      style={{ background: '#0A0C10' }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 px-5 py-4" style={{ borderBottom: '1px solid #1e2530' }}>
        <button onClick={onBack}>
          <ChevronLeft size={20} color="#9ca3af" />
        </button>
        <h2 className="text-white font-bold text-sm tracking-widest uppercase flex-1 text-center">
          Secure Checkout
        </h2>
        <div style={{ width: 20 }} />
      </div>

      <div className="px-6 py-6 flex-1 flex flex-col">
        {/* Summary */}
        <div className="rounded-xl p-4 mb-6" style={{ background: '#141820', border: '1px solid #1e2530' }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-500 text-sm">Plan Type:</span>
            <span className="text-white text-sm font-semibold">SpotMaster Pro Monthly</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Total Due Today:</span>
            <span className="text-2xl font-black" style={{ color: '#00FF88' }}>$29.00</span>
          </div>
        </div>

        {/* Google Pay mockup */}
        <button className="w-full py-3.5 rounded-xl font-semibold text-sm mb-5 bg-white text-gray-800 flex items-center justify-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24"><text y="18" fontSize="18">G</text></svg>
          <span style={{ fontFamily: 'sans-serif', color: '#1a1a2e', fontWeight: 700 }}>Pay</span>
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px" style={{ background: '#1e2530' }} />
          <span className="text-gray-600 text-xs tracking-widest uppercase">Or pay with card</span>
          <div className="flex-1 h-px" style={{ background: '#1e2530' }} />
        </div>

        {/* Card form */}
        <div className="space-y-3 flex-1">
          <div>
            <label className="text-gray-500 text-xs uppercase tracking-wider mb-1.5 block">Card Number</label>
            <div className="relative">
              <CreditCard size={16} color="#4b5563" className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                inputMode="numeric"
                placeholder="0000 0000 0000 0000"
                value={cardNum}
                onChange={(e) => setCardNum(formatCard(e.target.value))}
                className="w-full pl-9 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-700 outline-none"
                style={{ background: '#141820', border: '1px solid #1e2530' }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-500 text-xs uppercase tracking-wider mb-1.5 block">Expiry</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-700 outline-none"
                style={{ background: '#141820', border: '1px solid #1e2530' }}
              />
            </div>
            <div>
              <label className="text-gray-500 text-xs uppercase tracking-wider mb-1.5 block">CVV</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="•••"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-700 outline-none"
                style={{ background: '#141820', border: '1px solid #1e2530' }}
              />
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="flex items-center justify-center gap-2 my-4">
          <Shield size={13} color="#4b5563" />
          <span className="text-gray-600 text-xs">Capture guarantee or refund</span>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onNext()}
          className="w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase transition-all"
          style={{
            background: isValid ? '#00FF88' : '#1e2530',
            color: isValid ? '#0A0C10' : '#4b5563',
            cursor: isValid ? 'pointer' : 'not-allowed',
          }}
        >
          Confirm Payment
        </motion.button>
      </div>
    </motion.div>
  )
}
