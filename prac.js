async function a() {
  let transaction = null;
  try {
    transaction = "ji";
    console.log("========>", transaction);
    // await transaction.commit();
  } catch (error) {
    console.log(transaction);
    
    if (transaction) {
      console.log("==============",error);
    }
  }
}
a();
