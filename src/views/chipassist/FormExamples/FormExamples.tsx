import { Page } from "@src/components";
import React, { useEffect, useState } from "react";
import RFQListForm from "@src/views/chipassist/RfqList/components/Form/RFQListForm";
import { Grid } from "@material-ui/core";
import useStyles from "@src/views/chipassist/FormExamples/FormExamplesStyle";
import RFQModalContainer from "@src/views/chipassist/Rfq/components/RFQModal/components/RFQModalContainer";
import Switch from "@material-ui/core/Switch";
import SellExcessForm from "@src/views/chipassist/SellExcess/components/SellExcessForm";
import PcbRequest from "@src/views/chipassist/Pcb/PcbRequest/PcbRequest";
import { GeneralSettings } from "@src/views/chipassist/Profile/components/General/components";
import AddressForm from "@src/views/chipassist/Profile/components/CompanyAddress/components/AddressForm/AddressForm";
import Login from "@src/views/chipassist/Login/Login";
import Register from "@src/views/chipassist/Register/Register";
import SellerMessageContainer from "@src/views/chipassist/Rfq/components/SellerMessageModal/SellerMessageForm/SellerMessageContainer";
import SendOrderModalContainer from "@src/views/chipassist/Chat/components/ChatWindow/components/SendOrderModal/components/SendOrderModalContainer";
import MergeBomModal from "@src/views/chipassist/Bom/components/BomList/MergeBomModal/MergeBomModal";
import { getConstants } from "@src/store/pcb/pcbActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import SendInvoiceModalContainer from "@src/views/chipassist/Chat/components/ChatWindow/components/SendInvoiceModal/components/SendInvoiceModalContainer";
import QualityCheckContainer from "@src/views/chipassist/Rfq/components/QualityCheckModal/QualityCheckForm/QualityCheckContainer";

export const FormExamples = () => {
  const classes = useStyles();
  const [checkedA, setCheckedA] = useState(false);
  const [checkedASeller, setCheckedASeller] = useState(false);
  const [checkedAQuality, setCheckedAQuality] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  useEffect(() => {
    dispatch(getConstants());
  }, []);
  return (
    <Page style={{ padding: "20px" }}>
      <div className={classes.title}>
        <p>Form examples</p>
      </div>
      <Grid container spacing={3}>
        <Grid item md={12} lg={12}>
          <fieldset className={classes.gridItem}>
            <legend className={classes.legendText}>RFQ Form</legend>
            <div style={{ width: "100%" }}>
              <Switch
                checked={checkedA}
                onChange={() => setCheckedA((prevState) => !prevState)}
                name="checkedA"
                inputProps={{ "aria-label": "secondary checkbox" }}
                color={"secondary"}
              />
              is Authenticated
            </div>
            <Grid container spacing={3}>
              <Grid item md={12} lg={8}>
                <RFQModalContainer isAuth={checkedA} isExample={true} />
              </Grid>
            </Grid>
          </fieldset>
        </Grid>
        <Grid item md={12} lg={12}>
          <fieldset className={classes.gridItem}>
            <legend className={classes.legendText}>Login Form in RFQ Modal</legend>
            <Grid container spacing={3}>
              <Grid item md={12} lg={6}>
                <RFQModalContainer isLoginForm={true} isExample={true} />
              </Grid>
            </Grid>
          </fieldset>
        </Grid>
        <Grid item md={12} lg={12}>
          <fieldset className={classes.gridItem}>
            <legend className={classes.legendText}>RFQ List Form</legend>
            <RFQListForm isExample={true} />
          </fieldset>
        </Grid>

        <Grid item md={12} lg={12}>
          <fieldset className={classes.gridItem}>
            <legend className={classes.legendText}>Registration form</legend>
            <Register isExample={true} />
          </fieldset>
        </Grid>
        <Grid item md={12} lg={12}>
          <fieldset className={classes.gridItem}>
            <legend className={classes.legendText}>Login main</legend>

            <Login isExample={true} />
          </fieldset>
        </Grid>
        <Grid item md={12} lg={12}>
          <fieldset className={classes.gridItem}>
            <legend className={classes.legendText}>Sell on Chipassist form</legend>
            <Grid container spacing={3}>
              <Grid item md={12} lg={6}>
                <SellExcessForm isExample={true} />
              </Grid>
            </Grid>
          </fieldset>
        </Grid>
        <Grid item md={12} lg={12}>
          <fieldset className={classes.gridItem}>
            <legend className={classes.legendText}>PCB Request</legend>
            <PcbRequest isExample={true} isExampleDetails={false} />
          </fieldset>
        </Grid>
        <Grid item md={12} lg={12}>
          <fieldset className={classes.gridItem}>
            <legend className={classes.legendText}>PCB Request Details</legend>
            <PcbRequest isExample={true} isExampleDetails={true} />
          </fieldset>
        </Grid>
        <Grid item md={12} lg={12}>
          <fieldset className={classes.gridItem}>
            <legend className={classes.legendText}>General Settings</legend>
            <Grid container spacing={3}>
              <Grid item md={12} lg={8}>
                <GeneralSettings isExample={true} />
              </Grid>
            </Grid>
          </fieldset>
        </Grid>
        <Grid item md={12} lg={12}>
          <fieldset className={classes.gridItem}>
            <legend className={classes.legendText}>Address form</legend>
            <Grid container spacing={3}>
              <Grid item md={12} lg={12}>
                <AddressForm isExample={true} />
              </Grid>
            </Grid>
          </fieldset>
        </Grid>
        <Grid item md={12} lg={12}>
          <fieldset className={classes.gridItem}>
            <legend className={classes.legendText}>Seller message form</legend>
            <div style={{ width: "100%" }}>
              <Switch
                checked={checkedASeller}
                onChange={() => setCheckedASeller((prevState) => !prevState)}
                name="checkedA"
                inputProps={{ "aria-label": "secondary checkbox" }}
                color={"secondary"}
              />
              is Authenticated
            </div>
            <Grid container spacing={3}>
              <Grid item md={12} lg={8}>
                <SellerMessageContainer isAuth={checkedASeller} isExample={true} />
              </Grid>
            </Grid>
          </fieldset>
        </Grid>
        <Grid item md={12} lg={12}>
          <fieldset className={classes.gridItem}>
            <legend className={classes.legendText}>PO</legend>
            <Grid container spacing={3}>
              <Grid item md={12} lg={5}>
                <SendOrderModalContainer
                  isExample={true}
                  onCloseModal={null}
                  open
                  setIsSending={false}
                  stock={null}
                  pageNum={1}
                />
              </Grid>
              <Grid item md={12} lg={5}>
                <SendOrderModalContainer
                  isExample={true}
                  onCloseModal={null}
                  open
                  setIsSending={false}
                  stock={null}
                  pageNum={2}
                />
              </Grid>
            </Grid>
          </fieldset>
        </Grid>
        <Grid item md={12} lg={12}>
          <fieldset className={classes.gridItem}>
            <legend className={classes.legendText}>Supplier general setting</legend>
            <Grid container spacing={3}>
              <Grid item md={12} lg={4}>
                <MergeBomModal isExample={true} onClose={null} onView={null} submitHandle={null} />
              </Grid>
            </Grid>
          </fieldset>
        </Grid>
        <Grid item md={12} lg={12}>
          <fieldset className={classes.gridItem}>
            <legend className={classes.legendText}>PO</legend>
            <Grid container spacing={3}>
              <Grid item md={12} lg={6}>
                <SendInvoiceModalContainer
                  isExample={true}
                  onCloseModal={null}
                  open
                  setIsSending={false}
                  stock={null}
                  pageNum={1}
                />
              </Grid>
              <Grid item md={12} lg={6}>
                <SendInvoiceModalContainer
                  isExample={true}
                  onCloseModal={null}
                  open
                  setIsSending={false}
                  stock={null}
                  pageNum={2}
                />
              </Grid>
            </Grid>
          </fieldset>
        </Grid>
        <Grid item md={12} lg={12}>
          <fieldset className={classes.gridItem}>
            <legend className={classes.legendText}>Quality check</legend>
            <div style={{ width: "100%" }}>
              <Switch
                checked={checkedAQuality}
                onChange={() => setCheckedAQuality((prevState) => !prevState)}
                name="checkedQuality"
                inputProps={{ "aria-label": "secondary checkbox" }}
                color={"secondary"}
              />
              is Authenticated
            </div>
            <Grid container spacing={3}>
              <Grid item md={12} lg={8}>
                <QualityCheckContainer isExample={true} isAuth={checkedAQuality} />
              </Grid>
            </Grid>
          </fieldset>
        </Grid>
      </Grid>
    </Page>
  );
};

export default FormExamples;
