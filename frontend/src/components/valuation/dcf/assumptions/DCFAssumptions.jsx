import { useEffect, useState } from "react";
import AssumptionsTableData from "./assumptions-table-data/AssumptionsTableData";
import { useStockDetailsContext } from "../../../../context/StockDetailsContext";
import ShowTableToggle from "../../../stockdetails-layout/show-table-toggle/ShowTableToggle";
import DCFAssumptionsHeaderActions from "./DCFAssumptionsHeaderActions";
import AssumptionsCalculation from "./assumptions-calculation/AssumptionsCalculation";
import { useDCFContext } from "../../../../context/DCFContext";
import DCFCalculationsTable from "./dcf-calculations-table/DCFCalculationsTable";
import DCFChartSection from "./dcf-chart/DCFChartSection";

const DCFAssumptions = () => {
    const { value: {stockDetails: {cashflowStatement, incomeStatement}, keyMetrics: { fcf, netIncome }}} = useStockDetailsContext();

    const { value: { assumptionsSetup, setAssumptionsSetup, resetDCFIV }} = useDCFContext();

    const [showTable, setShowTable] = useState(true);

    useEffect(() => {
        calculateBaseValue(assumptionsSetup, setAssumptionsSetup, cashflowStatement, incomeStatement, fcf, netIncome);
        resetDCFIV();
    }, [assumptionsSetup?.baseMetric, assumptionsSetup?.baseDate]);

    return (
        <>
        <ShowTableToggle tableTitle="Assumptions" showTable={showTable} setShowTable={setShowTable} />
        { showTable && (
            <>
            <DCFAssumptionsHeaderActions />
            
            <AssumptionsTableData />

            <AssumptionsCalculation />

            <DCFCalculationsTable />

            <DCFChartSection />
            </>
        )}
        </>
    )
}

export default DCFAssumptions;

const calculateBaseValue = (assumptionsSetup, setAssumptionsSetup, cashflowStatement, incomeStatement, fcf, netIncome) => {
    if (cashflowStatement && incomeStatement && assumptionsSetup?.baseMetric === 'freeCashflow') {
        if (assumptionsSetup?.baseDate === 'lastYear') {
            setAssumptionsSetup({
                ...assumptionsSetup,
                baseValue: cashflowStatement[0]?.freeCashFlow
            });
            return;
        }
        if (assumptionsSetup?.baseDate === 'avg2YRS') {
            setAssumptionsSetup({
                ...assumptionsSetup,
                baseValue: fcf?.fcfAvg2YRS
            });
            return;
        }
        if (assumptionsSetup?.baseDate === 'avg5YRS') {
            setAssumptionsSetup({
                ...assumptionsSetup,
                baseValue: fcf?.fcfAvg5YRS
            });
            return;
        }
    }

    if (assumptionsSetup?.baseDate === 'lastYear') {
        setAssumptionsSetup({
            ...assumptionsSetup,
            baseValue: incomeStatement[0]?.netIncome
        });
        return;
    }
    if (assumptionsSetup?.baseDate === 'avg2YRS') {
        setAssumptionsSetup({
            ...assumptionsSetup,
            baseValue: netIncome?.netIncomeAvg2YRS
        });
        return;
    }
    if (assumptionsSetup?.baseDate === 'avg5YRS') {
        setAssumptionsSetup({
            ...assumptionsSetup,
            baseValue: netIncome?.netIncomeAvg5YRS
        });
        return;
    }
}