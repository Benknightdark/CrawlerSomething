import { ClientConfig, crawlClient } from './Helpers/crawlerHelper';
const getContent=async (url:string)=>{
    let clientConfig: ClientConfig = new ClientConfig();
    clientConfig.ignoreStatic = true;
    clientConfig.url = url;
    const { browser, page, $ } = await crawlClient(clientConfig);
    //browser.close();
    page.close();
    return $
}
(async () => {
    const htmlContent=await getContent(`https://ithome.com.tw/news/133290`);
    console.log(htmlContent('.field-items').text())
    
})()
