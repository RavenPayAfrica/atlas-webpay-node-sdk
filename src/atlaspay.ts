interface PayProp {
  trx_ref?: string
}
const AtlasPay = ({ trx_ref }: PayProp) => {
  interface IframeProps extends HTMLIFrameElement {
    style: any
    allowTransparency?: boolean
  }

  const iframe: IframeProps = document.createElement('iframe')
  iframe.style =
    'border: 0; width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; z-index:3000; overflow: hidden'
  iframe.allowTransparency = true
  iframe.allow = 'clipboard-write'

  let paymentButton
  const interval: any = setInterval(() => {
    paymentButton = document.querySelector('.wc-ravenpay-btn')
    paymentButton &&
      paymentButton.addEventListener('click', () => {
        document.body.appendChild(iframe)
      })

    if (paymentButton) {
      return clearInterval(interval)
    }
  }, 500)

  iframe.src = `https://elaborate-blancmange-d0d15d.netlify.app/?ref=${trx_ref}&platform=wordpress`
}

export default AtlasPay
