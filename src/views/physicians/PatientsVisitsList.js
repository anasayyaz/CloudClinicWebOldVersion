import React from "react";
import MUIDataTable from "mui-datatables";
import { NavLink } from "react-router-dom";
import "./style.css";
import PaginationTable from "../Components/PaginationTable";
import { parseJwt, formatDate } from "../../_helper/functions";
import Axios from "axios";
import { Alert, AlertTitle, Pagination } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import { connect } from "react-redux";
import { store } from "../../store";
import list, { put, post } from "../../_helper/api";
import ModalCarousel from "../Components/ModalCarousel";
import STable from "../Components/STable";
import PopUp from "../Components/PopUp";
import moment from "moment-timezone";
import DiagnosisData from "../Components/DiagnosisData";
import PrescriptionData from "../Components/PrescriptionData";
import PatientLabTestData from "../Components/PatientLabTesData";
import "./styles.css";
import "./style.css";
import "./ccstyles.css";
import Canvas from "./Canvas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditVitalSign.css";
import VitalSigns from "../Components/VitalSigns";
import qs from "query-string";
class PatientsVisitsList extends React.Component {
  constructor(props) {
    super(props);
    this.alert = {
      open: false,
      severity: "success",
      message: "",
      title: "success",
    };
    this.state = {
      dataPatient: {
        initialComplain: "",
        prescription: "",
        id: "",
        name: "",
      },
      regular: "false",
      irregular: "false",
      cname: "",
      cid: "",
      prescription: "",
      assessment: "",
      vid: "",
      age: "",
      number: "",
      email: "",
      image: {},
      modalPatientFileUpload: false,
      viewFileUploadModal: false,
      visitstate: 0,
      visitId: null,
      showPrescription: false,
      showLabTest:false,
      prescription: "",
      showInitialComplain: false,
      showIntakeHistory: false,
      initialComplain: "",
      vitalSignID: "",
      patient_NationalID: "",
      dateTime1: "",
      pi: "",
      no: "",
      ecg: "",
      hr: "",
      qrs: "",
      qt: " ",
      qtc: "",
      nibP1: "",
      nibP2: "",
      manual1: "",
      manual2: "",
      mmHG1: "",
      mmHG2: "", 
      bpm: "",
      weight: "",
      height: "",
      spO2: "",
      pr: "",
      resP1: "",
      resP2: "",
      temp: "",
      sys: "",
      dia: "",
      ma: "",
      map: "",
      dateTime2: "",
      gender: "",
      patientName: "",
      datetimeECG: "",
      datetimeBP: "",
      showECG: true,
      showOnlyECG: false,
      painScale: "",
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
      expiredfamilymembers: "",
      anyfamilymemberswithdisease: "",
      smoking: "",
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
      forHowLong: "",
      surgeriesOperations: "",
      familyMembersHavingNotableIllness: "",
      familyMembersDiedSpecificIllness: "",
      isFever: "",
      feverRange: "",
      isShortnessofBreath: "",
      isHeadache: "",
      headacheRange: "",
      isBackache: "",
      backacheRange: "",
      isChestPain: "",
      chestPainRange: "",
      isStomachPain: "",
      stomachPainRange: "",
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
      isSmooking: "",
      isDrinking: "",
      isDrugs: "",
      isPregnant: "",
      isAbortionMiscarriage: "",
      isHotFlashes: "",
      isBreastFeeding: "",
      isUterinBleeding: "",
      isBreastLump: "",
      patient: "",
      Profession: "",
      medicineFrequency: "",
      medicineDosage: "",
      medicineForm: "",
      nameHistory: "",
      genderHistory: "",
      id: "",
      showFS: true,
      showFSD: false,
      modalEcgGraph: false,
      requestData: this.requestData,
      alert: this.alert,
      columns: [
        {
          label: "Visit ID",
          name: "id",
          sortable: true,
          filter: true,
        },
        {
          label: "First Name",
          name: "patientFirstName",
          sortable: true,
          filter: true,
        },
        {
          label: "Last Name",
          name: "patientLastName",
          sortable: true,
          filter: true,
        },
        {
          label: "Reason",
          name: "title",
          sortable: true,
          filter: true,
        },
        {
          label: "Phone Number",
          name: "patientPhone",
          sortable: true,
          filter: true,
        },
        {
          label: "Start Time",
          name: "startDateTime",
          options: {
            customBodyRender: (val) => (
              <span>
                {new Date(val).toLocaleString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            ),
          },
        },
        // {
        //   label: "End Time",
        //   name: "endDateTime",
        //   options: {
        //     customBodyRender: (val) => (
        //       <span>
        //         {new Date(val).toLocaleString("en-US", {
        //           day: "2-digit",
        //           month: "2-digit",
        //           year: "2-digit",
        //           hour: "2-digit",
        //           minute: "2-digit",
        //         })}
        //       </span>
        //     ),
        //   },
        // },
        {
          label: "ID",
          hide: true,
          name: "id",
          button: {
            show: true,
            value: "Intake History",
            operation: (val) => {
              this.showIntakeHistory(val);
            },
          },
        },
        {
          label: "ID",
          hide: true,
          name: "id",
          button: {
            show: true,
            value: "Vital Signs",
            operation: (val) => {
              this.showVitalSigns(val);
            },
          },
        },
        {
          label: "ID",
          hide: true,
          name: "id",
          button: {
            show: true,
            value: "Initial Diagnosis & Plan",
            operation: (val) => {
              this.showInitialComplain(val);
            },
          },
        },
        {
          label: "ID",
          hide: true,
          name: "id",
          button: {
            show: true,
            value: "Prescription",
            operation: (val) => {
              this.showPrescription(val);
            },
          },
        },

        {
          label: "ID",
          hide: true,
          name: "id",
          button: {
            show: true,
            value: "Imaging / Lab Reports",
            operation: (val) => {
              this.getUploadedFiles(val);
            },
          },
        },
        {
          label: "ID",
          hide: true,
          name: "id",
          button: {
            show: true,
            value: "Lab Test",
            operation: (val) => {
              this.showLabTest(val);
            },
          },
        },
        // {
        //   label: "ID",
        //   hide:true,
        //   name: "id",
        //   button:{show:true, value:'Edit', operation: (val) => ( this.setState({modalPatientFileUpload:true, visitId:val})), icon:AddAPhoto},
        // }
      ],
      rowSelection: "single",
      rowData: [],
    };
    this.nameInput = React.createRef(); // define ref
    this.visitfun = this.visitfun.bind(this);
    this.handleSearchClick(null, this);
  }

  options = {
    filterType: "checkbox",
    selectableRows: false,
    responsive: "vertical",
  };

  visitfun(visitid) {
    console.log("visit page id in disptch", visitid);
    store.dispatch({
      type: "GET_nationalid",
      payload: {
        national_id: visitid,
      },
    });
  }
  operationDetailFS() {
    this.setState({
      showFS: !this.state.showFS,
      showFSD: !this.state.showFSD,
    });
  }

  print() {
    window.print();
  }
  showIntakeHistory(val) {
    list(`history/getVisitForHistory/${val}`).then((response) => {
      if (response.data.patientGender === "Female") {
        this.setState({ showFSD: true });
      } else {
        this.setState({ showFSD: false });
      }
      this.setState({
        nameHistory: response.data.patient,
        id: response.data.patient_NationalID,
        genderHistory: response.data.patientGender,
      });
    });

    list(`History/getPatientHistorybyVisit/${val}`).then((response) => {
      this.setState({
        painScale: response.data.painScale,
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
        expiredfamilymembers: response.data.expiredfamilymembers,
        anyfamilymemberswithdisease: response.data.anyfamilymemberswithdisease,
        smoking: response.data.smoking,
        drinking: response.data.drinking,
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
        forHowLong: response.data.forHowLong,
        surgeriesOperations: response.data.surgeriesOperations,
        familyMembersHavingNotableIllness:
          response.data.familyMembersHavingNotableIllness,
        familyMembersDiedSpecificIllness:
          response.data.familyMembersDiedSpecificIllness,
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
        isSmooking: response.data.isSmooking,
        isDrinking: response.data.isDrinking,
        isDrugs: response.data.isDrugs,
        isPregnant: response.data.isPregnant,
        isAbortionMiscarriage: response.data.isAbortionMiscarriage,
        isHotFlashes: response.data.isHotFlashes,
        isBreastFeeding: response.data.isBreastFeeding,
        isUterinBleeding: response.data.isUterinBleeding,
        isBreastLump: response.data.isBreastLump,
        patient: response.data.patient,
        Profession: response.data.Profession,
        medicineDosage: response.data.medicineDosage,
        medicineFrequency: response.data.medicineFrequency,
        medicineForm: response.data.medicineForm,
      });
    });
    setTimeout(() => {}, 1000);
    this.setState({ showIntakeHistory: true });
  }
  handleSearch(request, $class) {
    $class.setState({ requestData: request }, () => {
      $class.handleSearchClick();
    });
  }
  handleSearchClick(request, $class) {
    let pid = JSON.parse(localStorage.getItem("user"));
    // alert(pid);
    post(
      `physician/physicianPatientVisits?pageNumber=1&pageSize=10&QuerySearch=`,
      {
        Physician_UserID: pid,
        Patient_NationalID: qs.parse(this.props.location.search)?.id,
      }
    ).then((response) => {
      let items = [];
      items = response?.data?.items.map((item) => {
        item.dob = formatDate(item.dob);
        return item;
      });
      response.data.items = items;
      $class.setState({ rowData: response.data });
    });
  }
  showVitalSigns(val) {
    list(`visit/getVisit/${val}`).then((response) => {
      this.calculateAge(response.data[0].dob);
    });
    list(`vitalsign/getPatientVitalSignbyVisit/${val}`).then((response) => {
      if (response.data.ma == 0) {
        this.setState({ regular: true });
        this.setState({ irregular: false });
      } else {
        this.setState({ irregular: true });
        this.setState({ regular: false });
      }
      this.setState({
        vitalSignID: response.data.vitalSignID,
        patient_NationalID: response.data.patient_NationalID,
        dateTime1: response.data.dateTime1,
        no: response.data.no,
        ecg: response.data.ecg,
        hr: response.data.hr,
        qrs: response.data.qrs,
        qt: response.data.qt,
        qtc: response.data.qtc,
        nibP1: response.data.nibP1,
        nibP2: response.data.nibP2,
        visitID: response.data.visitID,
        manual1: response.data.manual1,
        manual2: response.data.manual2,
        mmHG1: response.data.mmHG2,
        mmHG2: response.data.mmHG2,
        bpm: response.data.bpm,
        weight: response.data.weight,
        height: response.data.height,
        spO2: response.data.spO2,
        pr: response.data.pr,
        resP1: response.data.resP2,
        resP2: response.data.resP1,
        temp: response.data.temp,
        sys: response.data.sys,
        dia: response.data.dia,
        pi: response.data.pi,
        ma: response.data.ma,
        map: response.data.map,
        dateTime2: response.data.dateTime2,
        patientName: response.data.patientName,
        datetimeBP: response.data.datetimeBP,
        datetimeECG: response.data.datetimeECG,
        gender: response.data.gender,
      });
    });
    setTimeout(() => {}, 1000);
    this.setState({ vid: val });
    this.setState({ showVitalSigns: true });
  }
  operationECG() {
    this.setState({
      showECG: !this.state.showECG,
      showOnlyECG: !this.state.showOnlyECG,
    });
  }

  sendEmailP() {
    let [{ dataPatient }, { id }] = [this.state, this.props.match.params];

    dataPatient["tag"] = "Prescription";
    dataPatient["visitid"] = this.state.vid;
    post(`visit/sendEmailToPatient`, dataPatient);
    toast.info("Prescription sent to " + this.state.email + " by Email");
  }
  sendEmailA() {
    let [{ dataPatient }, { id }] = [this.state, this.props.match.params];
    dataPatient["tag"] = "Asssessment";
    dataPatient["visitid"] = this.state.vid;
    post(`visit/sendEmailToPatient`, dataPatient);
    toast.info("Assessment sent to " + this.state.email + " by Email");
  }
  sendSMSA() {
    let [{ dataPatient }, { id }] = [this.state, this.props.match.params];
    dataPatient["tag"] = "Asssessment";
    dataPatient["visitid"] = this.state.vid;
    post(`visit/sendSMSToPatient`, dataPatient);
    toast.info("Assessment sent to " + this.state.number + " by SMS");
  }
  sendSMSP() {
    let [{ dataPatient }, { id }] = [this.state, this.props.match.params];
    dataPatient["tag"] = "Prescription";
    dataPatient["visitid"] = this.state.vid;
    post(`visit/sendSMSToPatient`, dataPatient);

    toast.info("Prescription sent to " + this.state.number + " by SMS");
  }

  showPrescription(val) {
    this.setState({ vid: val });
    list(`visit/${val}`).then((response) => {
      this.setState({
        prescription: response.data.prescription,
        number: response.data.patient.phone,
        email: response.data.patient.email,
      });
    });

    list(`visit/getVisit/${val}`).then((response) => {
      this.calculateAge(response.data[0].dob);
      this.setState({
        cname: response.data[0].consultant,
        cid: response.data[0].consultant_NationalID,
      });
    });

    this.setState({ showPrescription: true });
  }


  showLabTest(val) {
    this.setState({ vid: val });
    list(`visit/${val}`).then((response) => {
      this.setState({
        prescription: response.data.prescription,
        number: response.data.patient.phone,
        email: response.data.patient.email,
      });
    });

    list(`visit/getVisit/${val}`).then((response) => {
      this.calculateAge(response.data[0].dob);
      this.setState({
        cname: response.data[0].consultant,
        cid: response.data[0].consultant_NationalID,
      });
    });

    this.setState({ showLabTest: true });
  }

  showInitialComplain(val) {
    this.setState({ vid: val });
    list(`visit/${val}`).then((response) => {
      this.setState({
        assessment: response.data.initialComplain,
      });
    });

    list(`visit/getVisit/${val}`).then((response) => {
      this.setState({
        cname: response.data[0].consultant,
      });
    });
    this.setState({ showInitialComplain: true });
  }
  

  onSelectionChanged = () => {
    var selectedRows = this.gridApi.getSelectedRows();
    this.props.history.push(
      "/EditPatient?.Patient=" + selectedRows[0].nationalID
    );
  };
  handleFileChange = (input) => {
    const file = input.target.files?.[0];
    let { image } = this.state;
    var d = new Date();
    if (file) {
      let n = file.name.lastIndexOf(".");
      let filename = file.name.substring(n + 1);
  
      console.log("filesssss", file);
      image = {
        name: `${d.getTime() + "." + filename
  }`,
        file,
        url: URL.createObjectURL(file),
      };
      this.setState({ image });
    }
  };
  createUpload = async () => {
    let { image } = this.state;
    let formData = new FormData();
    formData.append("body", image.file, image.name);
    console.log("formData", formData, image);
    await post("UploadFile", formData).then(() => {
      this.SaveImageData();
    });
  };
  SaveImageData = (event) => {
    let { image } = this.state;
    post("LabTest", {
      isDeleted: false,
      imagePath: image.name,
      imageName: image.name,
      visitId: this.state.visitId,
      patientId: this.props.match.params.id,
      Description: image.Description,
    }).then((response) => {
      this.setState({ modalPatientFileUpload: false });
    });
  };
  getUploadedFiles(id) {
    list(`LabTest/visitsLabtests/${id}`)
      .then((response) => {
        this.setState({ images: response.data, viewFileUploadModal: true });
      })
      .catch((error) => {
        toast.info("No Record Found");
      });
  }
  handleClose() {
  
    let { alert } = this.state;
    alert.open = false;
    this.setState({ alert });
  }
  calculateAge(dob1) {
    var today = new Date();
    var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    this.setState({ age: age_now });
  }
  render() {
    let { requestData, columns, rowData, alert, data } = this.state;
    data = data?.items?.map((row) => {
      row.ImgPath =
        "https://media4.s-nbcnews.com/j/newscms/2016_36/1685951/ss-160826-twip-05_8cf6d4cb83758449fd400c7c3d71aa1f.nbcnews-ux-2880-1000.jpg";
      return row;
    });
    let {
      image,
      showIntakeHistory,
      modalPatientFileUpload,
      viewFileUploadModal,
      prescription,
      modalEcgGraph,
      showPrescription,
      showLabTest,
      initialComplain,
      showInitialComplain,
      showVitalSigns,
    } = this.state;
   
    return (
      <div className="tableWrapper">
        <ToastContainer />
        <PopUp
          $class={this}
          buttons={[]}
          show={showVitalSigns}
          width="1000px"
          title="Vital Signs"
          name="showVitalSigns"
          content={
            <React.Fragment>
              <VitalSigns
                consultant={this.state.vid}
                age={this.state.age}
                showAge="true"
              />
            </React.Fragment>
          }
        />
        <PopUp
          $class={this}
          buttons={[
            {
              title: "Close",
              className: "btn btn-secondary",
              action: "setState",
            },
          ]}
          show={modalEcgGraph}
          width="750px"
          title="ECG"
          name="modalEcgGraph"
          content={
            <div className="modal-body pb-3 cc-bg-light-grey">
              <div className="card shadow">
                <div className="col-md-12">
                  {/* <img src="avatars/ecg.gif" style={{ width: "100%", height: "100%" }} /> */}
                  <Canvas id={this.state.vid} />
                </div>
              </div>
            </div>
          }
        />
        <PopUp
          $class={this}
          buttons={[]}
          show={showIntakeHistory}
          width="1000px"
          title="History"
          name="showIntakeHistory"
          content={
            <React.Fragment>
              <div class="container px-4 col-12 m-0 pt-4 h-100 overflow-auto">
                <div className="form-group row">
                  <h4 class="control-label col-sm-2" htmlFor="Patient">
                    Patient Name:
                  </h4>
                  <h4 class="col-sm-3">{this.state.nameHistory}</h4>
                  <h4 class="control-label col-sm-2" htmlFor="Patient">
                    Patient ID:
                  </h4>
                  <h4 class="col-sm-3">{this.state.id}</h4>
                </div>

                <div>
                  <hr></hr>
                  <h3 style={{ textAlign: "center" }}>I - Chief Complaints </h3>
                  <hr></hr>

                  <div class="row">
                    <div class="col-md-3">
                      <input
                        name="isFever"
                        type="checkbox"
                        checked={this.state.isFever}
                      />
                      <label style={{ paddingLeft: "15px" }}>Fever</label>
                    </div>

                    <div class="col-md-3">
                      <input
                        name="isShortnessofBreath"
                        type="checkbox"
                        checked={this.state.isShortnessofBreath}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Shortness of Breath
                      </label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isHeadache"
                        type="checkbox"
                        checked={this.state.isHeadache}
                      />
                      <label style={{ paddingLeft: "15px" }}>Headache</label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isBackache"
                        type="checkbox"
                        checked={this.state.isBackache}
                      />
                      <label style={{ paddingLeft: "15px" }}>Backache</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <input
                        name="isChestPain"
                        type="checkbox"
                        checked={this.state.isChestPain}
                      />

                      <label style={{ paddingLeft: "15px" }}>Chest Pain</label>
                    </div>

                    <div class="col-md-3">
                      <input
                        name="isStomachPain"
                        type="checkbox"
                        checked={this.state.isStomachPain}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Stomach Pain
                      </label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isWeaknessGeneralized"
                        type="checkbox"
                        checked={this.state.isWeaknessGeneralized}
                      />
                      <label style={{ paddingLeft: "15px" }}>Weakness</label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isWeightLoss"
                        type="checkbox"
                        checked={this.state.isWeightLoss}
                      />
                      <label style={{ paddingLeft: "15px" }}>Weight Loss</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <input
                        name="iscough"
                        type="checkbox"
                        checked={this.state.iscough}
                      />
                      <label style={{ paddingLeft: "15px" }}>Cough</label>
                    </div>

                    <div class="col-md-3">
                      <input
                        name="isVomiting"
                        type="checkbox"
                        checked={this.state.isVomiting}
                      />
                      <label style={{ paddingLeft: "15px" }}>Vomiting</label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isDiarrhea"
                        type="checkbox"
                        checked={this.state.isDiarrhea}
                      />
                      <label style={{ paddingLeft: "15px" }}>Diarrhea</label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isLossofConsciousness"
                        type="checkbox"
                        checked={this.state.isLossofConsciousness}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Loss of Consciousness
                      </label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <input
                        name="isStroke"
                        type="checkbox"
                        checked={this.state.isStroke}
                      />
                      <label style={{ paddingLeft: "15px" }}>Stroke</label>
                    </div>

                    <div class="col-md-3">
                      <input
                        name="isHBP"
                        type="checkbox"
                        checked={this.state.isHBP}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        High Blood Pressure
                      </label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isAbnormalLabTest"
                        type="checkbox"
                        checked={this.state.isAbnormalLabTest}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Abnormal Lab Test
                      </label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="anyOtherComplaint"
                        type="checkbox"
                        checked={this.state.anyOtherComplaint}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Any Other Complaint
                      </label>
                    </div>
                  </div>
                  <div class="row">
                    <div className="col-md-3">
                      <h5>For How Long: </h5>
                    </div>

                    <div className="col-md-9">
                      <div className="input-container">
                        <input type="text" value={this.state.forHowLong} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <hr></hr>
                  <h3 style={{ textAlign: "center" }}>II - Other Complaints</h3>
                  <hr></hr>
                  <div class="row">
                    <div class="col-md-3">
                      <input
                        name="isSeizure"
                        type="checkbox"
                        checked={this.state.isSeizure}
                      />
                      <label style={{ paddingLeft: "15px" }}>Seizure</label>
                    </div>

                    <div class="col-md-3">
                      <input
                        name="isMuscleWeakDis"
                        type="checkbox"
                        checked={this.state.isMuscleWeakDis}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Muscle Weakness
                      </label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isSleepDisturbance"
                        type="checkbox"
                        checked={this.state.isSleepDisturbance}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Sleep Disturbance
                      </label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isEyeProblem"
                        type="checkbox"
                        checked={this.state.isEyeProblem}
                      />
                      <label style={{ paddingLeft: "15px" }}>Eye Problem</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <input
                        name="isEarProblem"
                        type="checkbox"
                        checked={this.state.isEarProblem}
                      />
                      <label style={{ paddingLeft: "15px" }}>Ear Problem</label>
                    </div>

                    <div class="col-md-3">
                      <input
                        name="isNoseProblem"
                        type="checkbox"
                        checked={this.state.isNoseProblem}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Nose Problem
                      </label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isThroatProblem"
                        type="checkbox"
                        checked={this.state.isThroatProblem}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Throat Problem
                      </label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isDentalPrblem"
                        type="checkbox"
                        checked={this.state.isDentalPrblem}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Dental Problem
                      </label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <input
                        name="isMouthProblem"
                        type="checkbox"
                        checked={this.state.isMouthProblem}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Mouth Problem
                      </label>
                    </div>

                    <div class="col-md-3">
                      <input
                        name="isThyroidProblem"
                        type="checkbox"
                        checked={this.state.isthyroidProblem}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Thyroid Problem
                      </label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isHeartDisease"
                        type="checkbox"
                        checked={this.state.isHeartDisease}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Heart Problem
                      </label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isHeartRacing"
                        type="checkbox"
                        checked={this.state.isHeartRacing}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Heart Racing
                      </label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <input
                        name="isLungDisease"
                        type="checkbox"
                        checked={this.state.isLungDisease}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Lung Disease
                      </label>
                    </div>

                    <div class="col-md-3">
                      <input
                        name="isLeverDisease"
                        type="checkbox"
                        checked={this.state.isLeverDisease}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Liver Disease
                      </label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isJaundice"
                        type="checkbox"
                        checked={this.state.isJaundice}
                      />
                      <label style={{ paddingLeft: "15px" }}>Jaundice</label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isHepatitis"
                        type="checkbox"
                        checked={this.state.isHepatitis}
                      />
                      <label style={{ paddingLeft: "15px" }}>Hepatitis</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <input
                        name="isSwallingProblem"
                        type="checkbox"
                        checked={this.state.isSwallingProblem}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Swalling Problem
                      </label>
                    </div>

                    <div class="col-md-3">
                      <input
                        name="isHeartBurn"
                        type="checkbox"
                        checked={this.state.isHeartBurn}
                      />
                      <label style={{ paddingLeft: "15px" }}>Heart Burn</label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isBloodinStool"
                        type="checkbox"
                        checked={this.state.isBloodinStool}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Blood in Stool
                      </label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isSwollenFeet"
                        type="checkbox"
                        checked={this.state.isSwollenFeet}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Swollen Feet
                      </label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <input
                        name="isFacialPuffiness"
                        type="checkbox"
                        checked={this.state.isFacialPuffiness}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Facial Puffiness
                      </label>
                    </div>

                    <div class="col-md-3">
                      <input
                        name="isKidneyDisease"
                        type="checkbox"
                        checked={this.state.isKidneyDisease}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Kidney Disease
                      </label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isBurningUrine"
                        type="checkbox"
                        checked={this.state.isBurningUrine}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Burning Urine
                      </label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isBloodinUrine"
                        type="checkbox"
                        checked={this.state.isBloodinUrine}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Blood in Urine
                      </label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <input
                        name="isKidneyStones"
                        type="checkbox"
                        checked={this.state.isKidneyStones}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Kidney Stones
                      </label>
                    </div>

                    <div class="col-md-3">
                      <input
                        name="isBoneDisease"
                        type="checkbox"
                        checked={this.state.isBoneDisease}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Bone Disease
                      </label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isJointSwellingPain"
                        type="checkbox"
                        checked={this.state.isJointSwellingPain}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Joint Swelling/Pain
                      </label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isSkinRash"
                        type="checkbox"
                        checked={this.state.isSkinRash}
                      />
                      <label style={{ paddingLeft: "15px" }}>Skin Rash</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <input
                        name="isSkinDisease"
                        type="checkbox"
                        checked={this.state.isSkinDisease}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Skin Disease
                      </label>
                    </div>

                    <div class="col-md-3">
                      <input
                        name="isDiabetes"
                        type="checkbox"
                        checked={this.state.isDiabetes}
                      />
                      <label style={{ paddingLeft: "15px" }}>Diabetes</label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isAnemia"
                        type="checkbox"
                        checked={this.state.isAnemia}
                      />
                      <label style={{ paddingLeft: "15px" }}>Anemia</label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isBloodDisease"
                        type="checkbox"
                        checked={this.state.isBloodDisease}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Blood Disease
                      </label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <input
                        name="isBleedingProblem"
                        type="checkbox"
                        checked={this.state.isBleedingProblem}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Bleeding Problem
                      </label>
                    </div>

                    <div class="col-md-3">
                      <input
                        name="isTumor"
                        type="checkbox"
                        checked={this.state.isTumor}
                      />
                      <label style={{ paddingLeft: "15px" }}>Tumor</label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isCancer"
                        type="checkbox"
                        checked={this.state.isCancer}
                      />
                      <label style={{ paddingLeft: "15px" }}>Cancer</label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isMentalDisease"
                        type="checkbox"
                        checked={this.state.isMentalDisease}
                      />
                      <label style={{ paddingLeft: "15px" }}>Cancer</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <input
                        name="isDementia"
                        type="checkbox"
                        checked={this.state.isDementia}
                      />
                      <label style={{ paddingLeft: "15px" }}>Dementia</label>
                    </div>

                    <div class="col-md-3">
                      <input
                        name="isPsychologicalProblem"
                        type="checkbox"
                        checked={this.state.isPsychologicalProblem}
                      />
                      <label style={{ paddingLeft: "15px" }}>
                        Psychological Problem
                      </label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isAddiction"
                        type="checkbox"
                        checked={this.state.isAddiction}
                      />
                      <label style={{ paddingLeft: "15px" }}>Addiction</label>
                    </div>
                  </div>
                </div>

                <div>
                  <hr></hr>
                  <h3 style={{ textAlign: "center" }}>
                    III - Current Medicines
                  </h3>
                  <hr></hr>
                  <div class="row">
                    <div className="col-md-12">
                      <div class="row">
                        <div className="col-md-3">
                          <h5>Medications: </h5>
                        </div>

                        <div className="col-md-9">
                          <div className="input-container">
                            <input
                              type="text"
                              value={this.state.currentMedications}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div className="col-md-3">
                          <h5>Frequency: </h5>
                        </div>

                        <div className="col-md-9">
                          <div className="input-container">
                            <input
                              type="text"
                              value={this.state.medicineFrequency}
                            />
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div className="col-md-3">
                          <h5>Dosage: </h5>
                        </div>

                        <div className="col-md-9">
                          <div className="input-container">
                            <input
                              type="text"
                              value={this.state.medicineDosage}
                            />
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div className="col-md-3">
                          <h5>Form: </h5>
                        </div>

                        <div className="col-md-9">
                          <div className="input-container">
                            <input
                              type="text"
                              value={this.state.medicineForm}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <hr></hr>
                  <h3 style={{ textAlign: "center" }}>IV – Other Details</h3>
                  <hr></hr>

                  <div class="row">
                    <div className="col-md-3">
                      <h5>Allergies: </h5>
                    </div>

                    <div className="col-md-9">
                      <div className="input-container">
                        <input type="text" value={this.state.allergies} />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div className="col-md-3">
                      <h5>Vaccines: </h5>
                    </div>

                    <div className="col-md-9">
                      <div className="input-container">
                        <input type="text" value={this.state.immunization} />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div className="col-md-3">
                      <h5>Surgeries/Operations: </h5>
                    </div>

                    <div className="col-md-9">
                      <div className="input-container">
                        <input
                          type="text"
                          value={this.state.surgeriesOperations}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div className="col-md-3">
                      <h5>Accidents: </h5>
                    </div>

                    <div className="col-md-9">
                      <div className="input-container">
                        <input type="text" value={this.state.anymoreaccident} />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row" style={{ paddingTop: "10px" }}>
                  <div class="col-md-3">
                    <input
                      name="isBloodTransfusion"
                      type="checkbox"
                      checked={this.state.isBloodTransfusion}
                    />
                    <label style={{ paddingLeft: "15px" }}>
                      Blood Transfusion
                    </label>
                  </div>
                </div>

                <div>
                  <hr></hr>
                  <h3 style={{ textAlign: "center" }}>V - Personal</h3>
                  <hr></hr>
                  <div class="row">
                    <div className="col-md-12">
                      <div className="input-container">
                        <h6 style={{ paddingTop: "10px" }}>
                          Profession: {this.state.Profession}
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div class="row" style={{ paddingTop: "10px" }}>
                    <div class="col-md-4" style={{ paddingTop: "10" }}>
                      <input
                        name="isSmooking"
                        type="checkbox"
                        checked={this.state.isSmooking}
                      />
                      <label style={{ paddingLeft: "15px" }}>Smoking</label>
                    </div>
                    <div class="col-md-4">
                      <input
                        name="isDrinking"
                        type="checkbox"
                        checked={this.state.isDrinking}
                      />
                      <label style={{ paddingLeft: "15px" }}>Drinking</label>
                    </div>
                    <div class="col-md-4" style={{ paddingTop: "10" }}>
                      <input
                        name="isDrugs"
                        type="checkbox"
                        checked={this.state.isDrugs}
                      />
                      <label style={{ paddingLeft: "15px" }}>Drugs</label>
                    </div>
                  </div>
                </div>

                <div>
                  <hr></hr>
                  <h3 style={{ textAlign: "center" }}>VI - Family</h3>
                  <hr></hr>
                  <div class="row">
                    <div className="col-md-6">
                      <h5>Family Members Having Same Medical Problems: </h5>
                    </div>

                    <div className="col-md-6">
                      <div className="input-container">
                        <input
                          type="text"
                          value={this.state.SameMedicalProblems}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div className="col-md-6">
                      <h5>Family Members Having Noteable Illness: </h5>
                    </div>

                    <div className="col-md-6">
                      <div className="input-container">
                        <input
                          type="text"
                          value={this.state.familyMembersHavingNotableIllness}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div className="col-md-6">
                      <h5>Family Members Died Of Spcific Illness: </h5>
                    </div>

                    <div className="col-md-6">
                      <div className="input-container">
                        <input
                          type="text"
                          value={this.state.familyMembersDiedSpecificIllness}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {this.state.showFS ? <div></div> : null}
                {this.state.showFSD ? (
                  <div>
                    <hr></hr>
                    <h3 style={{ textAlign: "center" }}>
                      VII - Female Section Only
                    </h3>
                    <hr></hr>
                    <div class="row">
                      <div className="col-md-4">
                        <div className="input-container">
                          <text type="text">
                            {this.state.numberofpregnancies}
                          </text>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div className="input-container">
                          <text type="text">
                            {this.state.ageatmenstruation}
                          </text>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div className="input-container">
                          <text type="text">{this.state.ageofmenopaise}</text>
                        </div>
                      </div>
                    </div>

                    <div class="row" style={{ paddingTop: "10px" }}>
                      <div class="col-md-4">
                        <div className="input-container">
                          <h6>
                            Last Menstrual Period:{" "}
                            {this.state.lastmenstrualperiod}
                          </h6>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div className="input-container">
                          <h6>Last Pap Smear: {this.state.lastpapsmear}</h6>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div className="input-container">
                          <h6>Last Memogram: {this.state.lastmemogram}</h6>
                        </div>
                      </div>
                    </div>

                    <div class="row" style={{ paddingTop: "10px" }}>
                      <div class="col-md-4" style={{ paddingTop: "10" }}>
                        <input
                          name="isPregnant"
                          type="checkbox"
                          checked={this.state.isPregnant}
                        />
                        <label style={{ paddingLeft: "15px" }}>Pregnant</label>
                      </div>
                      <div class="col-md-4">
                        <input
                          name="isAbortionMiscarriage"
                          type="checkbox"
                          checked={this.state.isAbortionMiscarriage}
                        />
                        <label style={{ paddingLeft: "15px" }}>
                          Abortion/Miscarriage
                        </label>
                      </div>
                      <div class="col-md-4" style={{ paddingTop: "10" }}>
                        <input
                          name="isHotFlashes"
                          type="checkbox"
                          checked={this.state.isHotFlashes}
                        />
                        <label style={{ paddingLeft: "15px" }}>
                          Hot Flashes
                        </label>
                      </div>
                    </div>

                    <div class="row" style={{ paddingTop: "10px" }}>
                      <div class="col-md-4" style={{ paddingTop: "10" }}>
                        <input
                          name="isBreastLump"
                          type="checkbox"
                          checked={this.state.isBreastLump}
                        />
                        <label style={{ paddingLeft: "15px" }}>
                          Breast Lump
                        </label>
                      </div>
                      <div class="col-md-4">
                        <input
                          name="isBreastFeeding"
                          type="checkbox"
                          checked={this.state.isBreastFeeding}
                        />
                        <label style={{ paddingLeft: "15px" }}>
                          Breast Feeding
                        </label>
                      </div>
                      <div class="col-md-4" style={{ paddingTop: "10" }}>
                        <input
                          name="isUterinBleeding"
                          type="checkbox"
                          checked={this.state.isUterinBleeding}
                        />
                        <label style={{ paddingLeft: "15px" }}>
                          Uterus Bleeding
                        </label>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </React.Fragment>
          }
        />
        <PopUp
          $class={this}
          buttons={[
            {
              title: "Close",
              className: "btn btn-secondary",
              action: "setState",
            },
          ]}
          show={modalEcgGraph}
          width="900px"
          title="ECG"
          name="modalEcgGraph"
          content={
            <div className="modal-body pb-3 cc-bg-light-grey">
              <div className="card shadow">
                <div className="col-md-12">
                  {/* <img src="avatars/ecg.gif" style={{ width: "100%", height: "100%" }} /> */}
                  <Canvas id={this.state.vid} />
                </div>
              </div>
            </div>
          }
        />
        <PopUp
          $class={this}
          buttons={[
            {
              title: (
                <img
                  src="avatars/printer.png"
                  style={{ width: "20px", height: "20px" }}
                />
              ),
              className: "btn btn-secondary",
              action: "print",
            },
            {
              title: (
                <img
                  src="avatars/email.png"
                  style={{ width: "20px", height: "20px" }}
                />
              ),
              className: "btn btn-secondary",
              action: "sendEmailP",
            },
            {
              title: (
                <img
                  src="avatars/sms.png"
                  style={{ width: "20px", height: "20px" }}
                />
              ),
              className: "btn btn-secondary",
              action: "sendSMSP",
            },
          ]}
          show={showPrescription}
          width="750px"
          title="Prescription"
          name="showPrescription"
          content={
            <PrescriptionData
              cname={this.state.cname}
              visitID={this.state.vid}
              consultantID={this.state.consultantID}
            />
          }
        />
             <PopUp
          $class={this}
          buttons={[
            {
              title: (
                <img
                  src="avatars/printer.png"
                  style={{ width: "20px", height: "20px" }}
                />
              ),
              className: "btn btn-secondary",
              action: "print",
            },
            {
              title: (
                <img
                  src="avatars/email.png"
                  style={{ width: "20px", height: "20px" }}
                />
              ),
              className: "btn btn-secondary",
              action: "sendEmailP",
            },
            {
              title: (
                <img
                  src="avatars/sms.png"
                  style={{ width: "20px", height: "20px" }}
                />
              ),
              className: "btn btn-secondary",
              action: "sendSMSP",
            },
          ]}
          show={showLabTest}
          width="750px"
          title="Lab Test"
          name="showLabTest"
          content={
            <PatientLabTestData
              cname={this.state.cname}
              visitID={this.state.vid}
              consultantID={this.state.consultantID}
            />
          }
        />
        <PopUp
          $class={this}
          buttons={[
            {
              title: (
                <img
                  src="avatars/printer.png"
                  style={{ width: "20px", height: "20px" }}
                />
              ),
              className: "btn btn-secondary",
              action: "print",
            },
            {
              title: (
                <img
                  src="avatars/email.png"
                  style={{ width: "20px", height: "20px" }}
                />
              ),
              className: "btn btn-secondary",
              action: "sendEmailA",
            },
            {
              title: (
                <img
                  src="avatars/sms.png"
                  style={{ width: "20px", height: "20px" }}
                />
              ),
              className: "btn btn-secondary",
              action: "sendSMSA",
            },
          ]}
          show={showInitialComplain}
          width="750px"
          title="Diagnosis & Plan "
          name="showInitialComplain"
          content={
            <div className="modal-body pb-3 cc-bg-light-grey">
              <div className="card shadow">
                <div className="col-md-12">
                  <div className="row py-3 mx-2 border-bottom d-flex justify-content-between">
                    <img
                      src="https://cloudclinicdevapi.azurewebsites.net/images/CloudClinicLogo.png"
                      alt="Cloud Clinic Logo"
                      className="cc_logo"
                    />
                    <div className="text-right">
                      <div className="w-100 d-flex align-items-baseline col-md-6 mt-2 px-4">
                        <p className="pb-2 pr-2 m-0 cc-form-label">Dr.</p>
                        <h5 className="pt-2 cc-form-input">
                          {this.state.cname}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="form-group px-3">
                    {/* <textarea
                      className="form-control border-0"
                      rows={5}
                      name="initialComplain"
                      value={this.state.assessment}
                    /> */}
                    <DiagnosisData
                      cname={this.state.cname}
                      patientID={this.props.match.params.id}
                      visitID={this.state.vid}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <PopUp
          $class={this}
          buttons={[
            {
              title: "Cancel",
              className: "btn btn-secondary",
              action: "setState",
            },
            {
              title: "Upload",
              className: "btn btn-primary",
              action: "createUpload",
            },
          ]}
          show={modalPatientFileUpload}
          width="750px"
          title="Upload Files"
          name="modalPatientFileUpload"
          content={
            <React.Fragment>
              <div className="col-sm-12">
                <img src={image.url} style={{ maxHeight: "300px" }} />
                <h4>{image.name}</h4>
                <p>{image.url}</p>
              </div>
              <div className="col-sm-3" style={{ overflow: "hidden" }}>
                <input
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={this.handleFileChange}
                />
              </div>
            </React.Fragment>
          }
        />
        <PopUp
          $class={this}
          buttons={[
            {
              title: "Close",
              className: "btn btn-secondary",
              action: "setState",
            },
          ]}
          show={viewFileUploadModal}
          width="750px"
          title="Imaging / Lab Reports"
          name="viewFileUploadModal"
          content={<ModalCarousel images={this.state.images} />}
        />
          <div className="tableWrapper">
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
        <div>
          <div className="tableWrapper">
            <PaginationTable
              title="Visits"
              columns={columns}
              data={rowData}
              options={this.options}
              onSelectionChanged={this.onSelectionChanged}
              rowSelection={this.rowSelection}
              $class={this}
              search={true}
              handleSearchClick={this.handleSearchClick}
              requestData={requestData}
            />
          </div>
        </div>
      </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps)(PatientsVisitsList);
