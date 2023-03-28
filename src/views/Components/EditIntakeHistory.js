import React, { useEffect, useState, createRef } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import list, { put, post } from "../../_helper/api";
import { Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import TranslationContext from "../../context/translation";

export default class EditIntakeHistory extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.alert = {
      open: false,
      severity: "error",
      message: "",
      title: "error",
    };
    this.state = {
      idNo: "",
      patientData: null,
      visitData: null,
      smoking: "",
      drinking: "",
      drugs: "",
      painScale: "5",
      fever: "",
      weaknesss: "",
      shortnessOfBreath: "",
      weightLoss: "",
      swollenGlands: "",
      currentMedications: "",
      allergies: "",
      immunization: "",
      birthproblems: "",
      childhoodillness: "",
      anymoreaccident: "",
      bloodtransfusion: "",
      psychatricillness: "",
      familyMembersHavingNotableIllness: "",
      familyMembersDiedSpecificIllness: "",
      familyMemberSameMedicalProblems: "",
      drinking: "",
      recreational: "",
      ageatmenstruation: "",
      ageofmenopaise: "",
      abnormalperiods: "",
      numberofpregnancies: "",
      abortion: " ",
      numberoflivebriths: "",
      anychilddied: "",
      lastmenstrualperiod: "",
      pregnant: "",
      lastpapsmear: "",
      breastlump: "",
      lastmemogram: "",
      hotflashes: "",
      breastfeeding: "",
      uterusbleed: "",
      contraception: "",
      cessarionsection: "",
      disability: "",
      stroke: "",
      headinjury: "",
      migrine: "",
      eyeproblems: "",
      sleepdisturbances: "",
      earproblems: "",
      noseproblems: "",
      throatproblems: "",
      dentalproblems: "",
      heartproblems: "",
      lungproblems: "",
      onhomeoxygen: "",
      swallowingproblems: "",
      liverproblems: "",
      urinaryproblems: "",
      kidneydisease: "",
      thyroiddisease: "",
      diabetes: "",
      muscularproblems: "",
      bonepain: "",
      jointstiffness: "",
      backproblems: "",
      skindisease: "",
      skinrashes: "",
      anemia: "",
      bloodclots: "",
      bleedingproblems: "",
      tumor: "",
      cancer: "",
      radiation: "",
      chemotherapy: "",
      addictious: "",
      anyOtherComplaint: "",
      IsAnyOtherComplaint: "",
      forHowLong: "",
      surgeriesOperations: "",
      isFever: "",
      feverRange: 0,
      isShortnessofBreath: "",
      isHeadache: "",
      headacheRange: 0,
      isBackache: "",
      backacheRange: 0,
      isChestPain: "",
      chestPainRange: 0,
      isStomachPain: "",
      stomachPainRange: 0,
      isWeaknessGeneralized: "",
      isWeightLoss: "",
      iscough: "",
      isVomiting: "",
      isDiarrhea: "",
      isLossofConsciousness: "",
      isStroke: "",
      isHBP: "",
      isAbnormalLabTest: "",
      isSeizure: "",
      isMuscleWeakDis: "",
      isSleepDisturbance: "",
      isEyeProblem: "",
      isEarProblem: "",
      isNoseProblem: "",
      isThroatProblem: "",
      isDentalPrblem: "",
      isMouthProblem: "",
      isThyroidProblem: "",
      isHeartDisease: "",
      isHeartRacing: "",
      isLungDisease: "",
      isLeverDisease: "",
      isJaundice: "",
      isHepatitis: "",
      isSwallingProblem: "",
      isHeartBurn: "",
      isBloodinStool: "",
      isSwollenFeet: "",
      isFacialPuffiness: "",
      isKidneyDisease: "",
      isBurningUrine: "",
      isBloodinUrine: "",
      isKidneyStones: "",
      isBoneDisease: "",
      isJointSwellingPain: "",
      joinSwellingPainRange: "",
      isSkinRash: "",
      isSkinDisease: "",
      isDiabetes: "",
      isAnemia: "",
      isBloodDisease: "",
      isBleedingProblem: "",
      isTumor: "",
      isCancer: "",
      isMentalDisease: "",
      isDementia: "",
      isPsychologicalProblem: "",
      isAddiction: "",
      isBloodTransfusion: "",
      IsSmoking: "",
      isDrinking: "",
      isDrugs: "",
      isPregnant: "",
      isAbortionMiscarriage: "",
      isHotFlashes: "",
      isBreastFeeding: "",
      isUterinBleeding: "",
      isBreastLump: "",
      profession: "",
      medicineFrequency: "",
      medicineDosage: "",
      medicineForm: "",
      patient: "",

      showFSD: false,

      count: 1,
      nameHistory: "",
      genderHistory: "",
      historyID: "",
      patientID: "",
      visitID: "",
      alert: this.alert,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
  }
  onCreateHistory = () => {
    put(`history/${this.state.historyID}`, this.state)
      .then((response) => {
        this.setState({
          alert: {
            open: true,
            severity: "success",
            message: "History successfully added",
            title: "Success",
          },
        });
        setTimeout(() => {
          this.props.setIsOpenPreviousIntakeHistory();
        }, 1000);
      })
      .catch((error) => {
        if (error.response.status === 409) {
          this.setState({
            alert: {
              open: true,
              severity: "error",
              message: "History with same ID already exists",
              title: "Error",
            },
          });
        } else {
          this.setState({
            alert: {
              open: true,
              severity: "error",
              message: "Something went wrong",
              title: "Error",
            },
          });
        }
      });
    //  setTimeout(() => {
    //     this.props.history.push('/dashboard')
    //   }, 1000);
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  componentDidMount = () => {
    list(`history/getVisitForHistory/${this.props.id}`).then((response) => {
      if (response.data.patientGender === "Female") {
        this.setState({ showFSD: true });
      } else {
        this.setState({ showFSD: false });
      }
      this.setState({
        nameHistory: response.data.patient,
        genderHistory: response.data.patientGender,
        visitID: response.data.id,
        patientID: response.data.patient_NationalID,
        idNo: response.data.patientIdentificationNo,
        patient_NationalID: response.data.patient_NationalID,
      });
    });

    setTimeout(() => {
      list(`History/getPatientHistorybyVisit/${this.props.id}`).then(
        (response) => {
          this.setState({
            historyID: response.data.historyID,
            fever: response.data.fever,
            weaknesss: response.data.weakness,
            shortnessOfBreath: response.data.shortnessOfBreath,
            weightLoss: response.data.weightLoss,
            swollenGlands: response.data.swollenGlands,
            currentMedications: response.data.currentMedications,
            allergies: response.data.allergies,
            immunization: response.data.immunization,
            birthproblems: response.data.birthproblems,
            childhoodillness: response.data.childhoodillness,
            anymoreaccident: response.data.anymoreaccident,
            bloodtransfusion: response.data.bloodtransfusion,
            psychatricillness: response.data.psychatricillness,
            familyMembersDiedSpecificIllness:
              response.data.familyMembersDiedSpecificIllness,
            familyMembersHavingNotableIllness:
              response.data.familyMembersHavingNotableIllness,
            familyMemberSameMedicalProblems:
              response.data.familyMemberSameMedicalProblems,
            smoking: response.data.smoking,
            drinking: response.data.drinking,
            drugs: response.data.drugs,
            IsSmoking: response.data.IsSmoking,
            IsDrinking: response.data.IsDrinking,
            IsDrugs: response.data.IsDrugs,
            recreational: response.data.recreational,
            ageatmenstruation: response.data.ageatmenstruation,
            ageofmenopaise: response.data.ageofmenopaise,
            abnormalperiods: response.data.abnormalperiods,
            numberofpregnancies: response.data.numberofpregnancies,
            abortion: response.data.abortion,
            numberoflivebriths: response.data.numberoflivebriths,
            anychilddied: response.data.anychilddied,
            lastmenstrualperiod: response.data.lastmenstrualperiod,
            pregnant: response.data.pregnant,
            lastpapsmear: response.data.lastpapsmear,
            breastlump: response.data.breastlump,
            lastmemogram: response.data.lastmemogram,
            hotflashes: response.data.hotflashes,
            breastfeeding: response.data.breastfeeding,
            uterusbleed: response.data.uterusbleed,
            contraception: response.data.contraception,
            cessarionsection: response.data.cessarionsection,
            disability: response.data.disability,
            stroke: response.data.stroke,
            headinjury: response.data.headinjury,
            migrine: response.data.migrine,
            eyeproblems: response.data.eyeproblems,
            sleepdisturbances: response.data.sleepdisturbances,
            earproblems: response.data.earproblems,
            noseproblems: response.data.noseproblems,
            throatproblems: response.data.throatproblems,
            dentalproblems: response.data.dentalproblems,
            heartproblems: response.data.heartproblems,
            lungproblems: response.data.lungproblems,
            onhomeoxygen: response.data.onhomeoxygen,
            swallowingproblems: response.data.swallowingproblems,
            liverproblems: response.data.liverproblems,
            urinaryproblems: response.data.urinaryproblems,
            kidneydisease: response.data.kidneydisease,
            thyroiddisease: response.data.thyroiddisease,
            diabetes: response.data.diabetes,
            muscularproblems: response.data.muscularproblems,
            bonepain: response.data.bonepain,
            jointstiffness: response.data.jointstiffness,
            backproblems: response.data.backproblems,
            skindisease: response.data.skindisease,
            skinrashes: response.data.skinrashes,
            anemia: response.data.anemia,
            bloodclots: response.data.bloodclots,
            bleedingproblems: response.data.bleedingproblems,
            tumor: response.data.tumor,
            cancer: response.data.cancer,
            radiation: response.data.radiation,
            chemotherapy: response.data.chemotherapy,
            addictious: response.data.addictious,
            anyOtherComplaint: response.data.anyOtherComplaint,
            IsAnyOtherComplaint: response.data.IsAnyOtherComplaint,
            forHowLong: response.data.forHowLong,
            surgeriesOperations: response.data.surgeriesOperations,
            familyMembersHavingNotableIllness:
              response.data.familyMembersHavingNotableIllness,
            familyMembersDiedSpecificIllness:
              response.data.familyMembersDiedSpecificIllness,
            familyMemberSameMedicalProblems:
              response.data.familyMemberSameMedicalProblems,
            isFever: response.data.isFever,
            feverRange: response.data.feverRange,
            isShortnessofBreath: response.data.isShortnessofBreath,
            isHeadache: response.data.isHeadache,
            headacheRange: response.data.headacheRange,
            isBackache: response.data.isBackache,
            backacheRange: response.data.backacheRange,
            isChestPain: response.data.isChestPain,
            chestPainRange: response.data.chestPainRange,
            isStomachPain: response.data.isStomachPain,
            stomachPainRange: response.data.stomachPainRange,
            isWeaknessGeneralized: response.data.isWeaknessGeneralized,
            isWeightLoss: response.data.isWeightLoss,
            iscough: response.data.iscough,
            isVomiting: response.data.isVomiting,
            isDiarrhea: response.data.isDiarrhea,
            isLossofConsciousness: response.data.isLossofConsciousness,
            isStroke: response.data.isStroke,
            isHBP: response.data.isHBP,
            isAbnormalLabTest: response.data.isAbnormalLabTest,
            isSeizure: response.data.isSeizure,
            isMuscleWeakDis: response.data.isMuscleWeakDis,
            isSleepDisturbance: response.data.isSleepDisturbance,
            isEyeProblem: response.data.isEyeProblem,
            isEarProblem: response.data.isEarProblem,
            isNoseProblem: response.data.isNoseProblem,
            isThroatProblem: response.data.isThroatProblem,
            isDentalPrblem: response.data.isDentalPrblem,
            isMouthProblem: response.data.isMouthProblem,
            isThyroidProblem: response.data.isThyroidProblem,
            isHeartDisease: response.data.isHeartDisease,
            isHeartRacing: response.data.isHeartRacing,
            isLungDisease: response.data.isLungDisease,
            isLeverDisease: response.data.isLeverDisease,
            isJaundice: response.data.isJaundice,
            isHepatitis: response.data.isHepatitis,
            isSwallingProblem: response.data.isSwallingProblem,
            isHeartBurn: response.data.isHeartBurn,
            isBloodinStool: response.data.isBloodinStool,
            isSwollenFeet: response.data.isSwollenFeet,
            isFacialPuffiness: response.data.isFacialPuffiness,
            isKidneyDisease: response.data.isKidneyDisease,
            isBurningUrine: response.data.isBurningUrine,
            isBloodinUrine: response.data.isBloodinUrine,
            isKidneyStones: response.data.isKidneyStones,
            isBoneDisease: response.data.isBoneDisease,
            isJointSwellingPain: response.data.isJointSwellingPain,
            joinSwellingPainRange: response.data.joinSwellingPainRange,
            isSkinRash: response.data.isSkinRash,
            isSkinDisease: response.data.isSkinDisease,
            isDiabetes: response.data.isDiabetes,
            isAnemia: response.data.isAnemia,
            isBloodDisease: response.data.isBloodDisease,
            isBleedingProblem: response.data.isBleedingProblem,
            isTumor: response.data.isTumor,
            isCancer: response.data.isCancer,
            isMentalDisease: response.data.isMentalDisease,
            isDementia: response.data.isDementia,
            isPsychologicalProblem: response.data.isPsychologicalProblem,
            isAddiction: response.data.isAddiction,
            isBloodTransfusion: response.data.isBloodTransfusion,
            IsSmoking: response.data.IsSmoking,
            isDrinking: response.data.isDrinking,
            isDrugs: response.data.isDrugs,
            isPregnant: response.data.isPregnant,
            isAbortionMiscarriage: response.data.isAbortionMiscarriage,
            isHotFlashes: response.data.isHotFlashes,
            isBreastFeeding: response.data.isBreastFeeding,
            isUterinBleeding: response.data.isUterinBleeding,
            isBreastLump: response.data.isBreastLump,
            profession: response.data.profession,
            drugs: response.data.drugs,
            medicineDosage: response.data.medicineDosage,
            medicineFrequency: response.data.medicineFrequency,
            medicineForm: response.data.medicineForm,
          });

          //   this.props.history.push('/ReceptionistDashboard')
        },
        1000
      );
    });
  };

  handleClose() {
    this.setState({ ...alert, open: false });
  }

  render() {
    const { translate } = this.context;
    let { alert } = this.state;
    return (
      <>
        <Snackbar
          open={alert.open}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={() => {
            this.handleClose();
          }}
        >
          <Alert
            onClose={() => {
              this.handleClose();
            }}
            severity={alert.severity}
          >
            <AlertTitle>{alert.title}</AlertTitle>
            <strong>{alert.message}</strong>
          </Alert>
        </Snackbar>

        <div class="container px-4 col-12 m-0 pt-4 h-100 overflow-auto">
          <div className="form-group row">
            <h4 class="control-label col-sm-2" htmlFor="Patient">
              {translate("PATIENT_NAME")}:
            </h4>
            <h4 class="col-sm-3">{this.state.nameHistory}</h4>
            <h4 class="control-label col-sm-2" htmlFor="Patient">
              {translate("PATIENT_ID")}:
            </h4>
            <h4 class="col-sm-3">{this.state.idNo}</h4>
          </div>

          <div>
            <h4>I - {translate("CHIEF_COMPALINTS")} </h4>
            <hr></hr>

            <div class="row">
              <div class="col-md-3">
                <input
                  name="isFever"
                  type="checkbox"
                  checked={this.state.isFever}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("FEVER")}
                </label>
              </div>

              <div class="col-md-3">
                <input
                  name="isShortnessofBreath"
                  type="checkbox"
                  checked={this.state.isShortnessofBreath}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("SHORTNESS_OF_BREATH")}
                </label>
              </div>
              <div class="col-md-3">
                <input
                  name="isHeadache"
                  type="checkbox"
                  checked={this.state.isHeadache}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("HEADACHE")}
                </label>
              </div>
              <div class="col-md-3">
                <input
                  name="isBackache"
                  type="checkbox"
                  checked={this.state.isBackache}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("BACKACHE")}
                </label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <input
                  name="isChestPain"
                  type="checkbox"
                  checked={this.state.isChestPain}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("CHESTPAIN")}
                </label>
              </div>

              <div class="col-md-3">
                <input
                  name="isStomachPain"
                  type="checkbox"
                  checked={this.state.isStomachPain}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("STOMACHPAIN")}
                </label>
              </div>
              <div class="col-md-3">
                <input
                  name="isWeaknessGeneralized"
                  type="checkbox"
                  checked={this.state.isWeaknessGeneralized}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("WEAKNESS")}
                </label>
              </div>
              <div class="col-md-3">
                <input
                  name="isWeightLoss"
                  type="checkbox"
                  checked={this.state.isWeightLoss}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("WEIGHTLOSS")}
                </label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <input
                  name="iscough"
                  type="checkbox"
                  checked={this.state.iscough}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("COUGH")}
                </label>
              </div>

              <div class="col-md-3">
                <input
                  name="isVomiting"
                  type="checkbox"
                  checked={this.state.isVomiting}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("VOMITING")}
                </label>
              </div>
              <div class="col-md-3">
                <input
                  name="isDiarrhea"
                  type="checkbox"
                  checked={this.state.isDiarrhea}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("DIARRHEA")}
                </label>
              </div>
              <div class="col-md-3">
                <input
                  name="isLossofConsciousness"
                  type="checkbox"
                  checked={this.state.isLossofConsciousness}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("LOSS_OF_CONSCIOUSNESS")}
                </label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <input
                  name="isStroke"
                  type="checkbox"
                  checked={this.state.isStroke}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("STROKE")}
                </label>
              </div>

              <div class="col-md-3">
                <input
                  name="isHBP"
                  type="checkbox"
                  checked={this.state.isHBP}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("HIGH_BLOOD_PRESSURE")}
                </label>
              </div>
              <div class="col-md-3">
                <input
                  name="isAbnormalLabTest"
                  type="checkbox"
                  checked={this.state.isAbnormalLabTest}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("ABNORMAL_LAB_TEST")}
                </label>
              </div>
              <div class="col-md-3">
                <input
                  name="IsAnyOtherComplaint"
                  type="checkbox"
                  checked={this.state.IsAnyOtherComplaint}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("ANY_OTHER_COMPLAINT")}
                </label>
              </div>
            </div>
            <div class="row">
              {this.state.IsAnyOtherComplaint ? (
                <div className="col-md-12">
                  <div className="input-container">
                    <input
                      value={this.state.anyOtherComplaint}
                      type="anyOtherComplaint"
                      id="anyOtherComplaint"
                      required
                      onChange={this.handleChange}
                    />
                    <label>{translate("ANY_OTHER_COMPLAINT")}</label>{" "}
                  </div>
                </div>
              ) : null}
            </div>
            <div class="row">
              <div className="col-md-12">
                <div className="input-container">
                  <input
                    value={this.state.forHowLong}
                    type="forHowLong"
                    id="forHowLong"
                    required
                    onChange={this.handleChange}
                  />
                  <label>{translate("FOR_HOW_LONG")}?</label>{" "}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4>II - {translate("DISEASES")}</h4>
            <hr></hr>
            <div class="row">
              <div class="col-md-3">
                <input
                  name="isEyeProblem"
                  type="checkbox"
                  checked={this.state.isEyeProblem}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("EYE_PROBLEM")}
                </label>
              </div>

              <div class="col-md-3">
                <input
                  name="isEarProblem"
                  type="checkbox"
                  checked={this.state.isEarProblem}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("EAR_PROBLEM")}
                </label>
              </div>

              <div class="col-md-3">
                <input
                  name="isNoseProblem"
                  type="checkbox"
                  checked={this.state.isNoseProblem}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("NOSE_PROBLEM")}
                </label>
              </div>
              <div class="col-md-3">
                <input
                  name="isThroatProblem"
                  type="checkbox"
                  checked={this.state.isThroatProblem}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("THROAT_PROBLEM")}
                </label>
              </div>
              <div class="row"></div>
              <div class="col-md-3">
                <input
                  name="isDentalPrblem"
                  type="checkbox"
                  checked={this.state.isDentalPrblem}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("DENTAL_PROBLEM")}
                </label>
              </div>

              <div class="col-md-3">
                <input
                  name="isMouthProblem"
                  type="checkbox"
                  checked={this.state.isMouthProblem}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("MOUTH_PROBLEM")}
                </label>
              </div>

              <div class="col-md-3">
                <input
                  name="isThyroidProblem"
                  type="checkbox"
                  checked={this.state.isThyroidProblem}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("THYROID_PROBLEM")}
                </label>
              </div>
              <div class="col-md-3">
                <input
                  name="isHeartDisease"
                  type="checkbox"
                  checked={this.state.isHeartDisease}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("HEART_PROBLEM")}
                </label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <input
                  name="isLungDisease"
                  type="checkbox"
                  checked={this.state.isLungDisease}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("LUNG_DISEASE")}
                </label>
              </div>

              <div class="col-md-3">
                <input
                  name="isLeverDisease"
                  type="checkbox"
                  checked={this.state.isLeverDisease}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("LIVER_DISEASE")}
                </label>
              </div>
              <div class="col-md-3">
                <input
                  name="isJaundice"
                  type="checkbox"
                  checked={this.state.isJaundice}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("JAUNDICE")}
                </label>
              </div>
              <div class="col-md-3">
                <input
                  name="isHepatitis"
                  type="checkbox"
                  checked={this.state.isHepatitis}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("HEPATITIS")}
                </label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <input
                  name="isSwallingProblem"
                  type="checkbox"
                  checked={this.state.isSwallingProblem}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("SWALLOWING_PROBLEM")}
                </label>
              </div>

              <div class="col-md-3">
                <input
                  name="isKidneyDisease"
                  type="checkbox"
                  checked={this.state.isKidneyDisease}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("KIDNEY_DISEASE")}
                </label>
              </div>

              <div class="col-md-3">
                <input
                  name="isBoneDisease"
                  type="checkbox"
                  checked={this.state.isBoneDisease}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("BONE_DISEASE")}
                </label>
              </div>

              <div class="col-md-3">
                <input
                  name="isSkinDisease"
                  type="checkbox"
                  checked={this.state.isSkinDisease}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("SKIN_DISEASE")}
                </label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <input
                  name="isDiabetes"
                  type="checkbox"
                  checked={this.state.isDiabetes}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("DIABETES")}
                </label>
              </div>
              <div class="col-md-3">
                <input
                  name="isAnemia"
                  type="checkbox"
                  checked={this.state.isAnemia}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("ANEMIA")}
                </label>
              </div>
              <div class="col-md-3">
                <input
                  name="isBloodDisease"
                  type="checkbox"
                  checked={this.state.isBloodDisease}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("BLOOD_DISEASE")}
                </label>
              </div>

              <div class="col-md-3">
                <input
                  name="isBleedingProblem"
                  type="checkbox"
                  checked={this.state.isBleedingProblem}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("BLEEDING_PROBLEM")}
                </label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <input
                  name="isTumor"
                  type="checkbox"
                  checked={this.state.isTumor}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("TUMOR")}
                </label>
              </div>
              <div class="col-md-3">
                <input
                  name="isCancer"
                  type="checkbox"
                  checked={this.state.isCancer}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("CANCER")}
                </label>
              </div>

              <div class="col-md-3">
                <input
                  name="isDementia"
                  type="checkbox"
                  checked={this.state.isDementia}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("DEMENTIA")}
                </label>
              </div>

              <div class="col-md-3">
                <input
                  name="isPsychologicalProblem"
                  type="checkbox"
                  checked={this.state.isPsychologicalProblem}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("PSYCHOLOGICAL_PROBLEM")}
                </label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <input
                  name="isSeizure"
                  type="checkbox"
                  checked={this.state.isSeizure}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("SEIZURE")}
                </label>
              </div>
            </div>
          </div>

          <div>
            <h4>III -{translate("SYMPTOMS")}</h4>
            <hr></hr>
            <div class="row">
              <div class="col-md-3">
                <input
                  name="isMuscleWeakDis"
                  type="checkbox"
                  checked={this.state.isMuscleWeakDis}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("MUSCLE_WEAKNESS")}
                </label>
              </div>
              <div class="col-md-3">
                <input
                  name="isSleepDisturbance"
                  type="checkbox"
                  checked={this.state.isSleepDisturbance}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("SLEEP_DISTURBANCE")}
                </label>
              </div>

              <div class="col-md-3">
                <input
                  name="isHeartRacing"
                  type="checkbox"
                  checked={this.state.isHeartRacing}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("HEART_RACING")}
                </label>
              </div>

              <div class="col-md-3">
                <input
                  name="isHeartBurn"
                  type="checkbox"
                  checked={this.state.isHeartBurn}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("HEART_BURN")}
                </label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <input
                  name="isBloodinStool"
                  type="checkbox"
                  checked={this.state.isBloodinStool}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("BLOOD_IN_STOOL")}
                </label>
              </div>
              <div class="col-md-3">
                <input
                  name="isSwollenFeet"
                  type="checkbox"
                  checked={this.state.isSwollenFeet}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("SWOLLEN_FEET")}
                </label>
              </div>

              <div class="col-md-3">
                <input
                  name="isFacialPuffiness"
                  type="checkbox"
                  checked={this.state.isFacialPuffiness}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("FACIAL_PUFFINESS")}
                </label>
              </div>

              <div class="col-md-3">
                <input
                  name="isBurningUrine"
                  type="checkbox"
                  checked={this.state.isBurningUrine}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("BURNING_URINE")}
                </label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <input
                  name="isBloodinUrine"
                  type="checkbox"
                  checked={this.state.isBloodinUrine}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("BLOOD_IN_URINE")}
                </label>
              </div>

              <div class="col-md-3">
                <input
                  name="isKidneyStones"
                  type="checkbox"
                  checked={this.state.isKidneyStones}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("KIDNEY_STONES")}
                </label>
              </div>

              <div class="col-md-3">
                <input
                  name="isJointSwellingPain"
                  type="checkbox"
                  checked={this.state.isJointSwellingPain}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("JOINT_SWELLING_PAIN")}
                </label>
              </div>
              <div class="col-md-3">
                <input
                  name="isSkinRash"
                  type="checkbox"
                  checked={this.state.isSkinRash}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("SKIN_RASH")}
                </label>
              </div>
            </div>
          </div>

          <div>
            <h4>IV - {translate("CURRENT_MEDICATION")}</h4>
            <hr></hr>
            <div class="row">
              <div className="col-md-12">
                <div className="input-container">
                  <input
                    value={this.state.currentMedications}
                    type="text"
                    id="currentMedications"
                    required
                    onChange={this.handleChange}
                  />
                  <label>{translate("CURRENT_MEDICATION")}</label>
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.medicineFrequency}
                    id="medicineFrequency"
                    required
                  />{" "}
                  <label>{translate("FREQUENCY")}</label>
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.medicineDosage}
                    id="medicineDosage"
                    required
                  />
                  <label>{translate("DOSAGE")}</label>
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.medicineForm}
                    id="medicineForm"
                    required
                  />
                  <label>{translate("FORM")}</label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4>V – {translate("OTHER_DETAILS")}</h4>
            <hr></hr>
            <div class="row">
              <div className="col-md-3">
                <div className="input-container">
                  <input
                    value={this.state.allergies}
                    type="allergies"
                    id="allergies"
                    required
                    onChange={this.handleChange}
                  />
                  <label>{translate("ALLERGIES")}</label>{" "}
                </div>
              </div>

              <div className="col-md-3">
                <div className="input-container">
                  <input
                    value={this.state.immunization}
                    type="immunization"
                    id="immunization"
                    required
                    onChange={this.handleChange}
                  />
                  <label>{translate("IMMUNIZATIONS")}</label>{" "}
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-container">
                  <input
                    value={this.state.surgeriesOperations}
                    type="surgeriesOperations"
                    id="surgeriesOperations"
                    required
                    onChange={this.handleChange}
                  />
                  <label>{translate("SURGERIES_OPERATIONS")}</label>{" "}
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-container">
                  <input
                    value={this.state.anymoreaccident}
                    type="anymoreaccident"
                    id="anymoreaccident"
                    required
                    onChange={this.handleChange}
                  />
                  <label>{translate("ACCIDENT")}</label>{" "}
                </div>
              </div>
            </div>
            <div class="row" style={{ paddingTop: "10px" }}>
              <div class="col-md-3">
                <input
                  name="isBloodTransfusion"
                  type="checkbox"
                  checked={this.state.isBloodTransfusion}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("BLOOD_TRANSFUSION")}
                </label>
              </div>
            </div>
          </div>

          <div>
            <h4>VI - {translate("SOCIAL_HISTORY")}</h4>
            <hr></hr>
            <div class="row">
              <div className="col-md-12">
                <div className="input-container">
                  <input
                    value={this.state.profession}
                    type="profession"
                    id="profession"
                    required
                    onChange={this.handleChange}
                  />
                  <label>{translate("PROFESSION_JOB")}</label>{" "}
                </div>
              </div>
            </div>

            <div class="row" style={{ paddingTop: "10px" }}>
              <div class="col-md-4" style={{ paddingTop: "10" }}>
                <input
                  name="IsSmoking"
                  type="checkbox"
                  checked={this.state.IsSmoking}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("SMOKING")}
                </label>
              </div>
              <div class="col-md-4">
                <input
                  name="isDrinking"
                  type="checkbox"
                  checked={this.state.isDrinking}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("DRINKING")}
                </label>
              </div>
              <div class="col-md-4" style={{ paddingTop: "10" }}>
                <input
                  name="isDrugs"
                  type="checkbox"
                  checked={this.state.isDrugs}
                  onChange={this.handleInputChange}
                />
                <label style={{ paddingLeft: "15px" }}>
                  {translate("DRUGS")}
                </label>
              </div>
            </div>
            <div class="row" style={{ paddingTop: "10px" }}>
              <div className="col-md-4">
                <div className="input-container">
                  <input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.smoking}
                    id="smoking"
                    required
                    placeholder={translate("SMOKING_REQUENCY")}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="input-container">
                  <input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.drinking}
                    id="drinking"
                    required
                    placeholder={translate("DRINKING_FREQUENCY")}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="input-container">
                  <input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.drugs}
                    id="drugs"
                    required
                    placeholder={translate("DRUGS_FREQUENCY")}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4>VII - {translate("FAMILY_HISTORY")}</h4>
            <hr></hr>
            <div class="row">
              <div className="col-md-12">
                <div className="input-container">
                  <input
                    value={this.state.familyMemberSameMedicalProblems}
                    type="familyMemberSameMedicalProblems"
                    id="familyMemberSameMedicalProblems"
                    required
                    onChange={this.handleChange}
                  />
                  <label>
                    {translate("FAIMLY_MEMBER_HAVING_SAME_MEDICAL_PROBLEMS")}
                  </label>{" "}
                </div>
              </div>
            </div>
            <div class="row" style={{ paddingTop: "20" }}>
              <div className="col-md-12">
                <div className="input-container">
                  <input
                    value={this.state.familyMembersHavingNotableIllness}
                    type="familyMembersHavingNotableIllness"
                    id="familyMembersHavingNotableIllness"
                    required
                    onChange={this.handleChange}
                  />
                  <label>
                    {translate("FAIMLY_MEMBER_HAVING_NOTEABLE_ILLNESS")}
                  </label>{" "}
                </div>
              </div>
            </div>
            <div class="row" style={{ paddingTop: "20" }}>
              <div className="col-md-12">
                <div className="input-container">
                  <input
                    value={this.state.familyMembersDiedSpecificIllness}
                    type="familyMembersDiedSpecificIllness"
                    id="familyMembersDiedSpecificIllness"
                    required
                    onChange={this.handleChange}
                  />
                  <label>
                    {translate("FAIMLY_MEMBER_DIED_FOR_SPECIFC_ILLNESS")}
                  </label>{" "}
                </div>
              </div>
            </div>

            <div className="form-group"></div>
          </div>

          {this.state.showFSD ? (
            <div>
              <h4>VIII - {translate("FEMALE_SECTION_ONLY")}</h4>
              <hr></hr>
              <div class="row">
                <div className="col-md-4">
                  <div className="input-container">
                    <input
                      type="text"
                      onChange={this.handleChange}
                      id="numberofpregnancies"
                      required
                      placeholder={translate("NUMBER_OF_PREGNANCIES")}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-container">
                    <input
                      type="text"
                      onChange={this.handleChange}
                      id="ageatmenstruation"
                      required
                      placeholder={translate("AGE_AT_MENSTURATION")}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-container">
                    <input
                      type="text"
                      onChange={this.handleChange}
                      id="ageofmenopaise"
                      required
                      placeholder={translate("AGE_AT_MENOPAUSE")}
                    />
                  </div>
                </div>
              </div>

              <div class="row" style={{ paddingTop: "10px" }}>
                <div className="col-md-4">
                  <div className="input-container">
                    <input
                      type="text"
                      onChange={this.handleChange}
                      id="lastmenstrualperiod"
                      required
                      placeholder={translate("LAST_MENSTRUAL_PERIOD")}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-container">
                    <input
                      type="text"
                      onChange={this.handleChange}
                      id="lastpapsmear"
                      required
                      placeholder={translate("LAST_PAP_SMEAR")}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-container">
                    <input
                      type="text"
                      onChange={this.handleChange}
                      id="lastmemogram"
                      required
                      placeholder={translate("LAST_MAMOGRAM")}
                    />
                  </div>
                </div>
              </div>

              <div class="row" style={{ paddingTop: "10px" }}>
                <div class="col-md-4" style={{ paddingTop: "10" }}>
                  <input
                    name="isPregnant"
                    type="checkbox"
                    checked={this.state.isPregnant}
                    onChange={this.handleInputChange}
                  />
                  <label style={{ paddingLeft: "15px" }}>
                    {translate("PREGNANT")}
                  </label>
                </div>
                <div class="col-md-4">
                  <input
                    name="isAbortionMiscarriage"
                    type="checkbox"
                    checked={this.state.isAbortionMiscarriage}
                    onChange={this.handleInputChange}
                  />
                  <label style={{ paddingLeft: "15px" }}>
                    {translate("ABORTION_MISCARRIAGE")}
                  </label>
                </div>
                <div class="col-md-4" style={{ paddingTop: "10" }}>
                  <input
                    name="isHotFlashes"
                    type="checkbox"
                    checked={this.state.isHotFlashes}
                    onChange={this.handleInputChange}
                  />
                  <label style={{ paddingLeft: "15px" }}>
                    {translate("HOT_FLASHES")}
                  </label>
                </div>
              </div>

              <div class="row" style={{ paddingTop: "10px" }}>
                <div class="col-md-4" style={{ paddingTop: "10" }}>
                  <input
                    name="isBreastLump"
                    type="checkbox"
                    checked={this.state.isBreastLump}
                    onChange={this.handleInputChange}
                  />
                  <label style={{ paddingLeft: "15px" }}>
                    {translate("BREAST_LUMP")}
                  </label>
                </div>
                <div class="col-md-4">
                  <input
                    name="isBreastFeeding"
                    type="checkbox"
                    checked={this.state.isBreastFeeding}
                    onChange={this.handleInputChange}
                  />
                  <label style={{ paddingLeft: "15px" }}>
                    {translate("BREAST_FEEDING")}
                  </label>
                </div>
                <div class="col-md-4" style={{ paddingTop: "10" }}>
                  <input
                    name="isUterinBleeding"
                    type="checkbox"
                    checked={this.state.isUterinBleeding}
                    onChange={this.handleInputChange}
                  />
                  <label style={{ paddingLeft: "15px" }}>
                    {translate("UTERUS_BLEEDING")}
                  </label>
                </div>
              </div>
            </div>
          ) : null}

          <div
            class="row px-2 mt-1 d-flex justify-content-end"
            style={{ padding: "20px" }}
          >
            {this.state.showBtnPrevious ? (
              <div class="col-md-2 px-1">
                <button
                  onClick={() => {
                    this.previous();
                  }}
                  class="w-100 border-0 shadow btn btn-secondary cc-btn"
                >
                  {translate("PREVIOUS")}
                </button>
              </div>
            ) : null}
            {this.props.showSave ? 
            <div class="col-md-2 px-1">
              <button
                onClick={() => {
                  this.onCreateHistory();
                }}
                class="w-100 border-0 shadow btn btn-primary cc-btn"
              >
                {translate("SAVE")}
              </button>
            </div> : null}
          </div>
        </div>
      </>
    );
  }
}
// export default AddHistory;
