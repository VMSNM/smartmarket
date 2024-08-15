export const handlePortfolioSetup = async (portfolioFeatured, getTickerCurrentPrice, setPortfolio) => {

    await Promise.all(portfolioFeatured?.tickers?.map(async (ticker) => {
        const { currentPrice, yesterdayPrice } = await getTickerCurrentPrice(ticker.symbol);
        ticker.currentPrice = currentPrice;
        ticker.yesterdayPrice = yesterdayPrice;
        ticker.dayChange = (currentPrice - yesterdayPrice) / yesterdayPrice;
        ticker.dayChangeValue = currentPrice - yesterdayPrice;
        ticker.positionCost = ticker.sharesCount * ticker.avgBuyPrice;
        ticker.positionValue = ticker.sharesCount * currentPrice;
    }));

    portfolioFeatured.investmentsCost = portfolioFeatured?.tickers?.map(element => element)?.reduce((sum, ticker) => sum + (ticker.sharesCount * ticker.avgBuyPrice), 0);
    portfolioFeatured.investmentsValue = portfolioFeatured?.tickers?.map(element => element)?.reduce((sum, ticker) => sum + (ticker.sharesCount * ticker.currentPrice), 0);
    portfolioFeatured.investmentsGainLoss = portfolioFeatured.investmentsValue - portfolioFeatured.investmentsCost;
    portfolioFeatured.investmentsGainLossPercentage = portfolioFeatured.investmentsGainLoss / portfolioFeatured.investmentsCost;

    portfolioFeatured.positionCost = portfolioFeatured.investmentsCost + portfolioFeatured.cashPosition;
    portfolioFeatured.positionValue = portfolioFeatured.investmentsValue + portfolioFeatured.cashPosition;
    portfolioFeatured.positionGainLoss = portfolioFeatured.positionValue - portfolioFeatured.positionCost;

    portfolioFeatured.dayChangeValue = portfolioFeatured?.tickers?.map(element => element)?.reduce((sum, ticker) => sum + ticker.dayChangeValue, 0);
    portfolioFeatured.dayChangeToInvestments = portfolioFeatured.dayChangeValue / portfolioFeatured.investmentsValue;
    portfolioFeatured.dayChangeToPortfolio = portfolioFeatured.dayChangeValue / portfolioFeatured.positionValue;

    portfolioFeatured?.tickers?.map((ticker) => (ticker.percentageOfPortfolio = ticker.positionValue / portfolioFeatured.positionValue));
    portfolioFeatured.cashPositionPercentage = portfolioFeatured.cashPosition / portfolioFeatured.positionValue;
    
    /* console.log(portfolioFeatured); */
    setPortfolio(portfolioFeatured);

}