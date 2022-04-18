type Props<ApiResponse> = {
  maxRetryNum: number;
  retryDelayMs: number;
  apiCallback: () => ApiResponse;
}

const retryFunc = async <T>({ maxRetryNum = 3, retryDelayMs, apiCallback }: Props<T>) => {
  if (!apiCallback) {
    console.warn("With out api callback function")
    return;
  }

  let currentRetryNum = 0;
  let resp;

  while (true) {
    try {
      resp = await apiCallback();
      console.log('Call api success, resp is: ', resp);
      break;
    } catch (error) {
      currentRetryNum += 1;
      console.log(`Call api failure, retry record: ${currentRetryNum} times \nError: ${error}\n`);

      if (currentRetryNum >= maxRetryNum) {
        console.log(`It's retry failure maximum, ${maxRetryNum} times`);
        break;
      }
    }

    if (retryDelayMs) await sleep(retryDelayMs)
  }

  return resp;
}

async function sleep(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

const apiCallback = (_params = null) => {
  return async () => {
    // Mock api call was success or failure 
    const isSuccess = Math.random() < 0.1;
    if (isSuccess) {
      return {
        statusCode: 200,
        message: "success",
        items: { data: ['data1', 'data2'] }
      }
    }

    throw new Error("api error");
  }
}

const testGetRetryResp = async () => {
  const resp = await retryFunc<any>({ maxRetryNum: 10, retryDelayMs: 1000, apiCallback: apiCallback() });
  console.log("🚀 ~ file: retry-pattern.js ~ line 52 ~ resp", resp)
}
testGetRetryResp()

export default retryFunc;