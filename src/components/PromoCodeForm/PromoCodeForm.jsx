import { useCallback, useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { Button, TextField } from '@mui/material'
import './PromoCodeForm.css'

export function PromoCodeForm({ isPromoApplied, onApplyPromoCode }) {
  const [promoCode, setPromoCode] = useState('')
  const [promoStatus, setPromoStatus] = useState('idle')

  const handlePromoSubmit = useCallback(() => {
    if (isPromoApplied) {
      return
    }

    const isApplied = onApplyPromoCode(promoCode.trim())

    if (isApplied) {
      setPromoStatus('success')
      return
    }

    setPromoStatus('error')
  }, [isPromoApplied, onApplyPromoCode, promoCode])

  const currentPromoStatus = isPromoApplied ? 'success' : promoStatus
  const handleFormSubmit = useCallback((event) => {
    event.preventDefault()
    handlePromoSubmit()
  }, [handlePromoSubmit])

  return (
    <form className="promo-code-form" onSubmit={handleFormSubmit}>
      <div className="promo-code-form__input-wrap">
        <TextField
          size="small"
          variant="filled"
          label="Промокод"
          value={promoCode}
          className="promo-code-form__input"
          sx={{
            '& .MuiFilledInput-root': {
              height: 40,
              backgroundColor: '#fff',
              border: '1px solid rgba(0, 0, 0, 0.23)',
              borderRight: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 4,
              boxSizing: 'border-box',
              '&:hover': {
                borderColor: 'rgba(0, 0, 0, 0.87)',
              },
              '&.Mui-focused': {
                borderColor: '#1976d2',
              },
              '&.Mui-error': {
                borderColor: '#d32f2f',
              },
              '&:before, &:after': {
                display: 'none',
              },
            },
            '& .MuiInputBase-input': {
              paddingRight: '34px',
            },
            '& .MuiInputLabel-root': {
              transform: 'translate(12px, 10px) scale(1)',
            },
            '& .MuiInputLabel-root.MuiInputLabel-shrink': {
              transform: 'translate(12px, 5px) scale(0.75)',
            },
          }}
          onChange={(event) => {
            setPromoCode(event.target.value)
            if (!isPromoApplied) {
              setPromoStatus('idle')
            }
          }}
          error={currentPromoStatus === 'error'}
          slotProps={{
            htmlInput: {
              readOnly: isPromoApplied,
            },
            input: {
              disableUnderline: true,
            },
          }}
        />
        {currentPromoStatus === 'success' && <CheckCircleIcon className="promo-code-form__icon promo-code-form__icon_success" />}
        {currentPromoStatus === 'error' && <CancelIcon className="promo-code-form__icon promo-code-form__icon_error" />}
      </div>
      <Button
        variant="contained"
        type="submit"
        disabled={isPromoApplied}
        sx={{
          height: 40,
          minHeight: 40,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          boxShadow: 'none',
          '&:hover, &:active, &:focus': {
            boxShadow: 'none',
          },
        }}
      >
        Применить
      </Button>
    </form>
  )
}
