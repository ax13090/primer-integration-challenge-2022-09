window.addEventListener("load", onLoaded);

async function onLoaded() {
  const clientSession = await fetch('/client-session', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
  }).then(data => data.json())

  const { clientToken } = clientSession

  const universalCheckout = await Primer.showUniversalCheckout(clientToken, {
    // Specify the selector of the container element
    container: '#checkout-container',

    /**
     * When the checkout flow has been completed, you'll receive
     * the successful payment via `onCheckoutComplete`.
     * Implement this callback to redirect the user to an order confirmation page and fulfill the order.
     */
    onCheckoutComplete({ payment }) {
      console.log('Checkout Complete!', payment)
    },


    locale: "el-GR",

    style: {
      input: {
        base: {                
          fontFamily: 'Fantasy',
        },        
      },
      loadingScreen: {
        color: "#ca49f5"
      },
      showMorePaymentMethodsButton: { 
        base: {
          color: "green",
        },
        disabled: {
          color: "orange",
        },
      },
    },

    onCheckoutFail(error, { payment }, handler) {
      // Notifies you that the checkout flow has failed and a payment could not be created
      // This callback can also be used to display an error state within your own UI.
  
      console.log("onCheckoutFail called")
      // ⚠️ `handler` is undefined if the SDK does not expect anything from you
      if (!handler) {
        return;
      }
  
      // ⚠️ If `handler` exists, you MUST call one of the functions of the handler

      // Show a custom error message
      return handler.showErrorMessage('Oh noes, gotsa nay rawr: ' + error);
    },

    submitButton: {
      amountVisible: true,
    },
    /**
     * Learn more about the other options at:
     * https://primer.io/docs
     * https://www.npmjs.com/package/@primer-io/checkout-web
     */
  })
}
