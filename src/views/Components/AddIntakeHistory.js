
import React, { useEffect, useState, createRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import list, {put, post} from "../../_helper/api";
import { Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';

export default class AddIntakeHistory extends React.Component {
  constructor(props) {
    super(props);
      this.alert = {
      open: false, 
      severity: 'error',
      message:'',
      title:'error'
  }
    this.state = {
      patientData: null,
      visitData:null,
      painScale: '5',
      patient_NationalID:'',
      idNo:'',
      fever: '',
      weaknesss: '',
      shortnessOfBreath: '',
      weightLoss: '',
      swollenGlands: '',
      currentMedications: "",
      allergies: "",
      immunization: "",
      birthproblems: "",
      childhoodillness: "",
      anymoreaccident: "",
      bloodtransfusion: "",
      psychatricillness: "",
      familyMembersHavingNotableIllness:"",
familyMembersDiedSpecificIllness:"",
familyMemberSameMedicalProblems:"",
      smoking: "",
      drinking: "",
      drugs:"",
      recreational: "",
      ageatmenstruation: "",
      ageofmenopaise: '',
      abnormalperiods: '',
      numberofpregnancies: '',
      abortion:' ',
      numberoflivebriths:'',
      anychilddied: '',
      lastmenstrualperiod: '',
      pregnant: '',
      lastpapsmear: '',
      breastlump: '',
      lastmemogram: '',
      hotflashes: '',
      breastfeeding: '',
      uterusbleed: '',
      contraception: '',
      cessarionsection: '',
      disability: '',
      stroke: '',
      headinjury: '',
      migrine: '',
      eyeproblems: '',
      sleepdisturbances: '',
      earproblems: '',
      noseproblems: '',
      throatproblems: '',
      dentalproblems: '',
      heartproblems: '',
      lungproblems: '',
      onhomeoxygen: '',
      swallowingproblems: '',
      liverproblems: '',
      urinaryproblems: '',
      kidneydisease: '',
      thyroiddisease: '',
      diabetes:'',
      muscularproblems: '',
      bonepain: '',
      jointstiffness: '',
      backproblems: '',
      skindisease: '',
      skinrashes: '',
      anemia: '',
      bloodclots: '',
      bleedingproblems: '',
      tumor: '',
      cancer: '',
      radiation:'',
      chemotherapy: '',
      addictious: '',
      anyOtherComplaint: '',
      IsAnyOtherComplaint: '',
      forHowLong: '',
      surgeriesOperations: '',
      isFever: '',
      feverRange: 0,
      isShortnessofBreath: '',
      isHeadache: '',
      headacheRange: 0,
      isBackache:'',
      backacheRange: 0,
      isChestPain: '',
      chestPainRange: 0,
      isStomachPain:'',
      stomachPainRange: 0,
      isWeaknessGeneralized: '',
      isWeightLoss: '',
      iscough: '',
      isVomiting: '',
      isDiarrhea: '',
      isLossofConsciousness: '',
      isStroke:'',
      isHBP: '',
      isAbnormalLabTest: '',
      isSeizure:'',
      isMuscleWeakDis: '',
      isSleepDisturbance: '',
      isEyeProblem: '',
      isEarProblem: '',
      isNoseProblem: '',
      isThroatProblem: '',
      isDentalPrblem: '',
      isMouthProblem: '',
      isThyroidProblem: '',
      isHeartDisease: '',
      isHeartRacing: '',
      isLungDisease:'',
      isLeverDisease: '',
      isJaundice: '',
      isHepatitis:'',
      isSwallingProblem: '',
      isHeartBurn: '',
      isBloodinStool: '',
      isSwollenFeet: '',
      isFacialPuffiness: '',
      isKidneyDisease: '',
      isBurningUrine: '',
      isBloodinUrine: '',
      isKidneyStones: '',
      isBoneDisease: '',
      isJointSwellingPain: '',
      joinSwellingPainRange: '',
      isSkinRash: '',
      isSkinDisease:'',
      isDiabetes: '',
      isAnemia: '',
      isBloodDisease: '',
      isBleedingProblem: '',
      isTumor: '',
      isCancer: '',
      isMentalDisease:'',
      isDementia: '',
      isPsychologicalProblem: '',
      isAddiction: '',
      isBloodTransfusion:'',
      IsSmoking: '',
      isDrinking: '',
      isDrugs: '',
      isPregnant: '',
      isAbortionMiscarriage:'',
      isHotFlashes: '',
      isBreastFeeding: '',
      isUterinBleeding: '',
      isBreastLump:'',
           profession:'',
 medicineFrequency:"",
        medicineDosage: "",
        medicineForm: "",
      patient: '',
      
   
    


      showFSD:false,
      showBtnNext:true,
      showBtnPrevious:false,
      showBtnSave:false,
      count:1,
      nameHistory:'',
      genderHistory:'',
      historyID:'',
      patientID:'',
      visitID:'',
      alert:this.alert,
    };
  this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
   handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
 handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

  
  }
  onCreateHistory = () => {
      post('history', this.state).then((response)=>{
        this.setState({alert:{open:true, severity: 'success', message:'History successfully added', title:'Success'}})
           setTimeout(() => {
            this.props.closeAll();
        }, 1000);
    
        put(`patient/updatePatientTag/${this.state.patientID}`, {IsHistoryIntake: false})
  
      }).catch((error)=>{
        if(error.response.status === 409){
          this.setState({alert:{open:true, severity: 'error', message:'History with same ID already exists', title:'Error'}})
        }else{
          this.setState({alert:{open:true, severity: 'error', message:'Something went wrong', title:'Error'}})
        }
      });
    
  }

 
  operationDetailFS() {
    this.setState({
      showFS: !this.state.showFS,
      showFSD: !this.state.showFSD,
    });
  }

   handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  componentDidMount = () => {
         list(`history/getVisitForHistory/${this.props.id}`)   
           .then((response)=>{
            if (response.data.patientGender === "Female") {
              this.setState({showFSD:true});
            } else {
                this.setState({showFSD:false});
            }
            this.setState({
            nameHistory:response.data.patient,
           genderHistory:response.data.patientGender,
           visitID:response.data.id,
           patientID:response.data.patient_NationalID,
           idNo:response.data.patientIdentificationNo,
           patient_NationalID:response.data.patient_NationalID,
          });
        })
 setTimeout(() => {
         
      

        list(`History/patientLastHistory/${this.state.patient_NationalID}`)
        .then((response)=>{
          if (response.data.isConsultantRequired || response.data.isfollowup) {
       
              this.setState({
              fever: response.data.fever,
      weaknesss: response.data.weakness,
      shortnessOfBreath: response.data.shortnessOfBreath,
      weightLoss: response.data.weightLoss,
      swollenGlands: response.data.swollenGlands,
      currentMedications: response.data.currentMedications,
      allergies:response.data.allergies,
      immunization: response.data.immunization,
      birthproblems:response.data.birthproblems,
      childhoodillness: response.data.childhoodillness,
      anymoreaccident: response.data.anymoreaccident,
      bloodtransfusion: response.data.bloodtransfusion,
      psychatricillness: response.data.psychatricillness,
      familyMembersDiedSpecificIllness: response.data.familyMembersDiedSpecificIllness,
      familyMembersHavingNotableIllness: response.data.familyMembersHavingNotableIllness,
      familyMemberSameMedicalProblems:response.data.familyMemberSameMedicalProblems,
      smoking: response.data.smoking,
      drinking:response.data.drinking,
      drugs:response.data.drugs,
      IsSmoking: response.data.IsSmoking,
      IsDrinking:response.data.IsDrinking,
      IsDrugs:response.data.IsDrugs,
      recreational: response.data.recreational,
      ageatmenstruation:response.data.ageatmenstruation,
      ageofmenopaise: response.data.ageofmenopaise,
      abnormalperiods: response.data.abnormalperiods,
      numberofpregnancies:response.data.numberofpregnancies,
      abortion:response.data.abortion,
      numberoflivebriths:response.data.numberoflivebriths,
      anychilddied: response.data.anychilddied,
      lastmenstrualperiod: response.data.lastmenstrualperiod,
      pregnant: response.data.pregnant,
      lastpapsmear:response.data.lastpapsmear,
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
      diabetes:response.data.diabetes,
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
      radiation:response.data.radiation,
      chemotherapy: response.data.chemotherapy,
      addictious: response.data.addictious,
      anyOtherComplaint: response.data.anyOtherComplaint,
      IsAnyOtherComplaint: response.data.IsAnyOtherComplaint,
      forHowLong: response.data.forHowLong,
      surgeriesOperations: response.data.surgeriesOperations,
      familyMembersHavingNotableIllness: response.data.familyMembersHavingNotableIllness,
      familyMembersDiedSpecificIllness: response.data.familyMembersDiedSpecificIllness,
      familyMemberSameMedicalProblems:response.data.familyMemberSameMedicalProblems,
      isFever: response.data.isFever,
      feverRange: response.data.feverRange,
      isShortnessofBreath: response.data.isShortnessofBreath,
      isHeadache: response.data.isHeadache,
      headacheRange: response.data.headacheRange,
      isBackache:response.data.isBackache,
      backacheRange: response.data.backacheRange,
      isChestPain: response.data.isChestPain,
      chestPainRange: response.data.chestPainRange,
      isStomachPain:response.data.isStomachPain,
      stomachPainRange: response.data.stomachPainRange,
      isWeaknessGeneralized: response.data.isWeaknessGeneralized,
      isWeightLoss: response.data.isWeightLoss,
      iscough: response.data.iscough,
      isVomiting: response.data.isVomiting,
      isDiarrhea: response.data.isDiarrhea,
      isLossofConsciousness: response.data.isLossofConsciousness,
      isStroke:response.data.isStroke,
      isHBP: response.data.isHBP,
      isAbnormalLabTest: response.data.isAbnormalLabTest,
      isSeizure:response.data.isSeizure,
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
      isLungDisease:response.data.isLungDisease,
      isLeverDisease: response.data.isLeverDisease,
      isJaundice: response.data.isJaundice,
      isHepatitis:response.data.isHepatitis,
      isSwallingProblem:response.data.isSwallingProblem,
      isHeartBurn: response.data.isHeartBurn,
      isBloodinStool: response.data.isBloodinStool,
      isSwollenFeet: response.data.isSwollenFeet,
      isFacialPuffiness: response.data.isFacialPuffiness,
      isKidneyDisease: response.data.isKidneyDisease,
      isBurningUrine: response.data.isBurningUrine,
      isBloodinUrine:  response.data.isBloodinUrine,
      isKidneyStones:  response.data.isKidneyStones,
      isBoneDisease:  response.data.isBoneDisease,
      isJointSwellingPain:  response.data.isJointSwellingPain,
      joinSwellingPainRange:  response.data.joinSwellingPainRange,
      isSkinRash:  response.data.isSkinRash,
      isSkinDisease:  response.data.isSkinDisease,
      isDiabetes:  response.data.isDiabetes,
      isAnemia:  response.data.isAnemia,
      isBloodDisease:  response.data.isBloodDisease,
      isBleedingProblem:  response.data.isBleedingProblem,
      isTumor:  response.data.isTumor,
      isCancer:  response.data.isCancer,
      isMentalDisease: response.data.isMentalDisease,
      isDementia:  response.data.isDementia,
      isPsychologicalProblem:  response.data.isPsychologicalProblem,
      isAddiction:  response.data.isAddiction,
      isBloodTransfusion: response.data.isBloodTransfusion,
      IsSmoking:  response.data.IsSmoking,
      isDrinking:  response.data.isDrinking,
      isDrugs:  response.data.isDrugs,
      isPregnant:  response.data.isPregnant,
      isAbortionMiscarriage: response.data.isAbortionMiscarriage,
      isHotFlashes:  response.data.isHotFlashes,
      isBreastFeeding:  response.data.isBreastFeeding,
      isUterinBleeding:  response.data.isUterinBleeding,
      isBreastLump: response.data.isBreastLump,
         profession:response.data.profession,
      medicineDosage:response.data.medicineDosage,
      medicineFrequency:response.data.medicineFrequency,
      medicineForm:response.data.medicineForm,
          });
            } else {
        
                this.setState({
           
      
     
   profession:response.data.profession,
      medicineDosage:response.data.medicineDosage,
      medicineFrequency:response.data.medicineFrequency,
      medicineForm:response.data.medicineForm,
      swollenGlands: response.data.swollenGlands,
      currentMedications: response.data.currentMedications,
      allergies:response.data.allergies,
      immunization: response.data.immunization,
      birthproblems:response.data.birthproblems,
      childhoodillness: response.data.childhoodillness,
      anymoreaccident: response.data.anymoreaccident,
      bloodtransfusion: response.data.bloodtransfusion,
      psychatricillness: response.data.psychatricillness,
      familyMembersDiedSpecificIllness: response.data.familyMembersDiedSpecificIllness,
      familyMembersHavingNotableIllness: response.data.familyMembersHavingNotableIllness,
      familyMemberSameMedicalProblems: response.data.familyMemberSameMedicalProblems,
      smoking: response.data.smoking,
      drinking:response.data.drinking,
      drugs:response.data.drugs,
      IsSmoking: response.data.IsSmoking,
      IsDrinking:response.data.IsDrinking,
      IsDrugs:response.data.IsDrugs,
      recreational: response.data.recreational,
      ageatmenstruation:response.data.ageatmenstruation,
      ageofmenopaise: response.data.ageofmenopaise,
      abnormalperiods: response.data.abnormalperiods,
      numberofpregnancies:response.data.numberofpregnancies,
      abortion:response.data.abortion,
      numberoflivebriths:response.data.numberoflivebriths,
      anychilddied: response.data.anychilddied,
      lastmenstrualperiod: response.data.lastmenstrualperiod,
      pregnant: response.data.pregnant,
      lastpapsmear:response.data.lastpapsmear,
      breastlump: response.data.breastlump,
      lastmemogram: response.data.lastmemogram,
      hotflashes: response.data.hotflashes,
      breastfeeding: response.data.breastfeeding,
      uterusbleed: response.data.uterusbleed,
      contraception: response.data.contraception,
      cessarionsection: response.data.cessarionsection,
      disability: response.data.disability,
   
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
      diabetes:response.data.diabetes,
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
      radiation:response.data.radiation,
      chemotherapy: response.data.chemotherapy,
      addictious: response.data.addictious,
  
      surgeriesOperations: response.data.surgeriesOperations,
      familyMembersHavingNotableIllness: response.data.familyMembersHavingNotableIllness,
      familyMembersDiedSpecificIllness: response.data.familyMembersDiedSpecificIllness,
      familyMemberSameMedicalProblems:response.data.familyMemberSameMedicalProblems,
      isSeizure:response.data.isSeizure,
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
      isLungDisease:response.data.isLungDisease,
      isLeverDisease: response.data.isLeverDisease,
      isJaundice: response.data.isJaundice,
      isHepatitis:response.data.isHepatitis,
      isSwallingProblem:response.data.isSwallingProblem,
      isHeartBurn: response.data.isHeartBurn,
      isBloodinStool: response.data.isBloodinStool,
      isSwollenFeet: response.data.isSwollenFeet,
      isFacialPuffiness: response.data.isFacialPuffiness,
      isKidneyDisease: response.data.isKidneyDisease,
      isBurningUrine: response.data.isBurningUrine,
      isBloodinUrine:  response.data.isBloodinUrine,
      isKidneyStones:  response.data.isKidneyStones,
      isBoneDisease:  response.data.isBoneDisease,
      isJointSwellingPain:  response.data.isJointSwellingPain,
      joinSwellingPainRange:  response.data.joinSwellingPainRange,
      isSkinRash:  response.data.isSkinRash,
      isSkinDisease:  response.data.isSkinDisease,
      isDiabetes:  response.data.isDiabetes,
      isAnemia:  response.data.isAnemia,
      isBloodDisease:  response.data.isBloodDisease,
      isBleedingProblem:  response.data.isBleedingProblem,
      isTumor:  response.data.isTumor,
      isCancer:  response.data.isCancer,
      isMentalDisease: response.data.isMentalDisease,
      isDementia:  response.data.isDementia,
      isPsychologicalProblem:  response.data.isPsychologicalProblem,
      isAddiction:  response.data.isAddiction,
      isBloodTransfusion: response.data.isBloodTransfusion,
      IsSmoking:  response.data.IsSmoking,
      isDrinking:  response.data.isDrinking,
      isDrugs:  response.data.isDrugs,
      isPregnant:  response.data.isPregnant,
      isAbortionMiscarriage: response.data.isAbortionMiscarriage,
      isHotFlashes:  response.data.isHotFlashes,
      isBreastFeeding:  response.data.isBreastFeeding,
      isUterinBleeding:  response.data.isUterinBleeding,
      isBreastLump: response.data.isBreastLump,
          });
            }
            
        })
          }, 1000);
  }
 
  handleClose(){
    this.setState({...alert, open:false})
  }

  render() {
    
    let {alert} = this.state;
    return (

      <>
      <Snackbar open={alert.open}                  autoHideDuration={2000}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                anchorOrigin={{ vertical:'top', horizontal:'right' }} onClose={()=>{this.handleClose()}}>
        <Alert onClose={()=>{this.handleClose()}} severity={alert.severity}>
            <AlertTitle>{alert.title}</AlertTitle>
            <strong>{alert.message}</strong>
        </Alert>
      </Snackbar>

      
      <div class="container px-4 col-12 m-0 pt-4 h-100 overflow-auto">
        <div className="form-group row">
        <h4 class="control-label col-sm-2" htmlFor="Patient">Patient Name:</h4>
          <h4 class="col-sm-3">
          {this.state.nameHistory} 
        </h4>
          <h4 class="control-label col-sm-2" htmlFor="Patient">Patient ID:</h4>
          <h4 class="col-sm-3">
          {this.state.idNo} 
        </h4>
      </div>
        


   <div>
        <h4>I - Chief Complaint </h4>
        <hr></hr>
      
 <div class="row">  
           <div class="col-md-3">     
            <input
            name="isFever"
            type="checkbox"
            checked={this.state.isFever}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Fever
           </label>
           </div>

            <div class="col-md-3">     
             <input
            name="isShortnessofBreath"
            type="checkbox"
            checked={this.state.isShortnessofBreath}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Shortness of Breath
           </label>
           </div>
            <div class="col-md-3">        
           <input
            name="isHeadache"
            type="checkbox"
            checked={this.state.isHeadache}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Headache
           </label>
           </div>
            <div class="col-md-3">        
           <input
            name="isBackache"
            type="checkbox"
            checked={this.state.isBackache}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Backache
           </label>
           </div>

           

           
</div>
 <div class="row">  
           <div class="col-md-3">        
            <input
            name="isChestPain"
            type="checkbox"
            checked={this.state.isChestPain}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Chest Pain
           </label>
           </div>

            <div class="col-md-3">        
            <input
            name="isStomachPain"
            type="checkbox"
            checked={this.state.isStomachPain}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Stomach Pain
           </label>
           </div>
            <div class="col-md-3">        
           <input
            name="isWeaknessGeneralized"
            type="checkbox"
            checked={this.state.isWeaknessGeneralized}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Weakness
           </label>
           </div>
            <div class="col-md-3">        
            <input
            name="isWeightLoss"
            type="checkbox"
            checked={this.state.isWeightLoss}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Weight Loss
           </label>
           </div>

           

           
</div>
 <div class="row">  
           <div class="col-md-3">     
                <input
            name="iscough"
            type="checkbox"
            checked={this.state.iscough}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Cough
           </label>
           </div>

            <div class="col-md-3">        
                           <input
            name="isVomiting"
            type="checkbox"
            checked={this.state.isVomiting}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Vomiting
           </label>

           </div>
            <div class="col-md-3">        
                            <input
            name="isDiarrhea"
            type="checkbox"
            checked={this.state.isDiarrhea}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Diarrhea
           </label>
           </div>
            <div class="col-md-3">        
                            <input
            name="isLossofConsciousness"
            type="checkbox"
            checked={this.state.isLossofConsciousness}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
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
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Stroke
           </label>
           </div>

            <div class="col-md-3">        
                            <input
            name="isHBP"
            type="checkbox"
            checked={this.state.isHBP}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            High Blood Pressure
           </label>
           </div>
            <div class="col-md-3">        
                            <input
            name="isAbnormalLabTest"
            type="checkbox"
            checked={this.state.isAbnormalLabTest}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Abnormal Lab Test
           </label>
           </div>
            <div class="col-md-3">        
               <input
            name="IsAnyOtherComplaint"
            type="checkbox"
            checked={this.state.IsanyOtherComplaint}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Any Other Complaint
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
                              <label>Any Other Complaint</label>    </div>
</div>
) : null}
</div><div class="row">
 <div className="col-md-12">
 <div className="input-container">    
              <input
              value={this.state.forHowLong}
                                type="forHowLong"
                                id="forHowLong"
                                required
                                onChange={this.handleChange}
                              />
                              <label>For How Long?</label>    </div>
</div>
</div>

          </div>
     
           <div>
  <h4>II - Diseases (Tick all your active problems)</h4>
        <hr></hr>
        <div class="row">  
         
            <div class="col-md-3">        
           <input
            name="isEyeProblem"
            type="checkbox"
            checked={this.state.isEyeProblem}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Eye Problem
           </label>
           </div>

           

           
 
           <div class="col-md-3">        
             <input
            name="isEarProblem"
            type="checkbox"
            checked={this.state.isEarProblem}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Ear Problem
           </label>
           </div>

            <div class="col-md-3">        
             <input
            name="isNoseProblem"
            type="checkbox"
            checked={this.state.isNoseProblem}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Nose Problem
           </label>
           </div>
            <div class="col-md-3">        
             <input
            name="isThroatProblem"
            type="checkbox"
            checked={this.state.isThroatProblem}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Throat Problem
           </label>
           </div>
<div class="row">  
           </div>
            <div class="col-md-3">        
             <input
            name="isDentalPrblem"
            type="checkbox"
            checked={this.state.isDentalPrblem}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Dental Problem
           </label>
           </div>

           

           

           <div class="col-md-3">        
             <input
            name="isMouthProblem"
            type="checkbox"
            checked={this.state.isMouthProblem}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Mouth Problem
           </label>
           </div>

            <div class="col-md-3">        
             <input
            name="isThyroidProblem"
            type="checkbox"
            checked={this.state.isThyroidProblem}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Thyroid Problem
           </label>
           </div>
            <div class="col-md-3">        
             <input
            name="isHeartDisease"
            type="checkbox"
            checked={this.state.isHeartDisease}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Heart Problem
           </label>
           </div>
         

           

           
</div>
<div class="row">  
           <div class="col-md-3">        
           <input
            name="isLungDisease"
            type="checkbox"
            checked={this.state.isLungDisease}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Lung Disease
           </label>
           </div>

            <div class="col-md-3">        
           <input
            name="isLeverDisease"
            type="checkbox"
            checked={this.state.isLeverDisease}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Liver Disease
           </label>
           </div>
            <div class="col-md-3">        
           <input
            name="isJaundice"
            type="checkbox"
            checked={this.state.isJaundice}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Jaundice
           </label>
           </div>
            <div class="col-md-3">        
              <input
            name="isHepatitis"
            type="checkbox"
            checked={this.state.isHepatitis}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Hepatitis
           </label>
           </div>

           

           
</div>
<div class="row">  
           <div class="col-md-3">        
            <input
            name="isSwallingProblem"
            type="checkbox"
            checked={this.state.isSwallingProblem}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Swallowing Problem
           </label>
           </div>

        
          
         
           

           

            <div class="col-md-3">        
            <input
            name="isKidneyDisease"
            type="checkbox"
            checked={this.state.isKidneyDisease}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Kidney Disease
           </label>
           </div>
          
           

           

            <div class="col-md-3">        
           <input
            name="isBoneDisease"
            type="checkbox"
            checked={this.state.isBoneDisease}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Bone Disease
           </label>
           </div>
        
        
           

           
 
           <div class="col-md-3">        
             <input
            name="isSkinDisease"
            type="checkbox"
            checked={this.state.isSkinDisease}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Skin Disease
           </label>
           </div>
</div>
<div class="row">  
            <div class="col-md-3">        
              <input
            name="isDiabetes"
            type="checkbox"
            checked={this.state.isDiabetes}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Diabetes
           </label>
           </div>
            <div class="col-md-3">        
             <input
            name="isAnemia"
            type="checkbox"
            checked={this.state.isAnemia}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Anemia
           </label>
           </div>
            <div class="col-md-3">        
              <input
            name="isBloodDisease"
            type="checkbox"
            checked={this.state.isBloodDisease}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Blood Disease
           </label>
           </div>

           

           

           <div class="col-md-3">        
               <input
            name="isBleedingProblem"
            type="checkbox"
            checked={this.state.isBleedingProblem}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Bleeding Problem
           </label>
           </div>
</div>
<div class="row">  
            <div class="col-md-3">        
           <input
            name="isTumor"
            type="checkbox"
            checked={this.state.isTumor}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Tumor
           </label>
           </div>
            <div class="col-md-3">        
            <input
            name="isCancer"
            type="checkbox"
            checked={this.state.isCancer}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Cancer
           </label>
           </div>
          
           


           <div class="col-md-3">        
           <input
            name="isDementia"
            type="checkbox"
            checked={this.state.isDementia}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Dementia
           </label>
           </div>

            <div class="col-md-3">        
         <input
            name="isPsychologicalProblem"
            type="checkbox"
            checked={this.state.isPsychologicalProblem}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Psychological Problem
           </label>
           </div>
          
           

           

           
</div>
<div class="row"> 
<div class="col-md-3">        
           <input
            name="isSeizure"
            type="checkbox"
            checked={this.state.isSeizure}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Seizure
           </label>
           </div>
           </div>
</div>
       
           <div>
  <h4>III -Symptoms (Tick all your active problems)</h4>
        <hr></hr>
        <div class="row">  
        
            <div class="col-md-3">        
           <input
            name="isMuscleWeakDis"
            type="checkbox"
            checked={this.state.isMuscleWeakDis}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Muscle Weakness
           </label>
           </div>
            <div class="col-md-3">        
            <input
            name="isSleepDisturbance"
            type="checkbox"
            checked={this.state.isSleepDisturbance}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Sleep Disturbance
           </label>
           </div>
          
            <div class="col-md-3">        
            <input
            name="isHeartRacing"
            type="checkbox"
            checked={this.state.isHeartRacing}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Heart Racing
           </label>
           </div>

           

           
 
         

        

           

           


            <div class="col-md-3">        
            <input
            name="isHeartBurn"
            type="checkbox"
            checked={this.state.isHeartBurn}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Heart Burn
           </label>
           </div>
           </div>
<div class="row"> 
            <div class="col-md-3">        
            <input
            name="isBloodinStool"
            type="checkbox"
            checked={this.state.isBloodinStool}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Blood in Stool
           </label>
           </div>
            <div class="col-md-3">        
           <input
            name="isSwollenFeet"
            type="checkbox"
            checked={this.state.isSwollenFeet}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Swollen Feet
           </label>
           </div>

           

           
  
           <div class="col-md-3">        
            <input
            name="isFacialPuffiness"
            type="checkbox"
            checked={this.state.isFacialPuffiness}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Facial Puffiness
           </label>
           </div>

           
            <div class="col-md-3">        
            <input
            name="isBurningUrine"
            type="checkbox"
            checked={this.state.isBurningUrine}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Burning Urine
           </label>
           </div>
                      
</div>
<div class="row"> 
            <div class="col-md-3">        
           <input
            name="isBloodinUrine"
            type="checkbox"
            checked={this.state.isBloodinUrine}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Blood in Urine
           </label>
           </div>

           

 
           <div class="col-md-3">        
           <input
            name="isKidneyStones"
            type="checkbox"
            checked={this.state.isKidneyStones}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Kidney Stones
           </label>
           </div>

         
            <div class="col-md-3">        
         <input
            name="isJointSwellingPain"
            type="checkbox"
            checked={this.state.isJointSwellingPain}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Joint Swelling/Pain
           </label>
           </div>
            <div class="col-md-3">        
           <input
            name="isSkinRash"
            type="checkbox"
            checked={this.state.isSkinRash}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
            Skin Rash
           </label>
           </div>

           

           
</div>


</div>
        
            <div>
<h4>IV - Current Medications</h4>
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
                              <label>Current Medications</label>    
                              </div> 
                              <div className="input-container">
                               <input type="text" onChange={this.handleChange}   value={this.state.medicineFrequency} id="medicineFrequency" required  />  <label>Frequency</label> 
                               </div> 
                              <div className="input-container">
           <input type="text" onChange={this.handleChange}  value={this.state.medicineDosage}   id="medicineDosage" required  /><label>Dosage</label> 
           </div> 
                              <div className="input-container">
            <input type="text" onChange={this.handleChange}  value={this.state.medicineForm} id="medicineForm" required  /><label>Form</label> 

        </div>
        </div>
        </div>
        </div>
     
            <div>
<h4>V – Other Details</h4>
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
                              <label>Allergies</label>    </div>
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
                              <label>Immunizations</label>    </div>
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
                              <label>Surgries / Operaations</label>    </div>
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
                              <label>Accidents</label>    </div>
           </div>
           </div>
           <div class="row" style={{paddingTop:"10px"}}>  
           <div class="col-md-3" >        
           <input
            name="isBloodTransfusion"
            type="checkbox"
            checked={this.state.isBloodTransfusion}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Blood Transfusion
           </label>
           </div>

           

           </div>
           </div>
         
              <div>
<h4>VI - Social History</h4>
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
                              <label>Profession / Job</label>    </div>
           </div>

           
           </div>
           
           <div class="row" style={{paddingTop:"10px"}}>  
           <div class="col-md-4" style={{paddingTop:"10"}}>        
          <input
            name="IsSmoking"
            type="checkbox"
            checked={this.state.IsSmoking}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Smoking
           </label>
           </div>
<div class="col-md-4" >        
           <input
            name="isDrinking"
            type="checkbox"
            checked={this.state.isDrinking}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Drinking
           </label>
           </div>
           <div class="col-md-4" style={{paddingTop:"10"}}>        
          <input
            name="isDrugs"
            type="checkbox"
            checked={this.state.isDrugs}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Drugs
           </label>
           </div>
           

           </div>
             <div class="row" style={{paddingTop:"10px"}}>  
            <div className="col-md-4">
                <div className="input-container">           
           <input type="text" onChange={this.handleChange} value={this.state.smoking}  id="smoking" required placeholder="Smoking Frequency?" />
      </div>
           </div>
  <div className="col-md-4">
                <div className="input-container">           
           <input type="text" onChange={this.handleChange} value={this.state.drinking}  id="drinking" required placeholder="Drinking Frequency?" />
      </div>
           </div>
          <div className="col-md-4">
                <div className="input-container">           
           <input type="text" onChange={this.handleChange} value={this.state.drugs}   id="drugs" required placeholder="Drugs Frequency?" />
      </div>
           </div>
           

           </div>
           </div>
      
               <div>
           <h4>VII - family History</h4>
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
                              <label>family members having same medical problem</label>    </div>
           </div>


           </div>
           <div class="row" style={{paddingTop:"20"}}>
            <div className="col-md-12">
               
             <div className="input-container">    
              <input
              value={this.state.familyMembersHavingNotableIllness}
                                type="familyMembersHavingNotableIllness"
                                id="familyMembersHavingNotableIllness"
                                required
                                onChange={this.handleChange}
                              />
                              <label>family members having any other notable illness</label>    </div>
           </div>


           </div>
           <div class="row" style={{paddingTop:"20"}}>
            <div className="col-md-12">
                
        <div className="input-container">    
              <input
              value={this.state.familyMembersDiedSpecificIllness}
                                type="familyMembersDiedSpecificIllness"
                                id="familyMembersDiedSpecificIllness"
                                required
                                onChange={this.handleChange}
                              />
                              <label>family Members died of any specific Illness</label>    </div>
           </div>


           </div>




        <div className="form-group">
         
        </div>
</div>
            
             
              {this.state.showFSD ? (
       
          <div>

            <h4>VIII - Female Section Only</h4>
            <hr></hr>
                <div class="row">  
                <div className="col-md-4">
                <div className="input-container">        
           <input type="text" onChange={this.handleChange}   id="numberofpregnancies" required placeholder="Number Of Pregnancies" />
      </div>
           </div>
                <div className="col-md-4">
                <div className="input-container">        
           <input type="text" onChange={this.handleChange}   id="ageatmenstruation" required placeholder="Age At Mensturation" />
      </div>
           </div>
              <div className="col-md-4">
                <div className="input-container">      
           <input type="text" onChange={this.handleChange}  id="ageofmenopaise" required placeholder="Age At Menopause" />
      </div>
           </div>

           
           </div>
           
           <div class="row" style={{paddingTop:"10px"}}>  
               <div className="col-md-4">
                <div className="input-container">      
           <input type="text" onChange={this.handleChange}    id="lastmenstrualperiod" required placeholder="Last Menstrual Period" />
      </div>
           </div>
                <div className="col-md-4">
                <div className="input-container">         
           <input type="text" onChange={this.handleChange}    id="lastpapsmear" required placeholder="Last Pap Smear" />
      </div>
           </div>
                <div className="col-md-4">
                <div className="input-container">         
           <input type="text" onChange={this.handleChange}    id="lastmemogram" required placeholder="Last Mamogram" />
      </div>
           </div>

           
           

           </div>

             <div class="row" style={{paddingTop:"10px"}}>  
           <div class="col-md-4" style={{paddingTop:"10"}}>        
             <input
            name="isPregnant"
            type="checkbox"
            checked={this.state.isPregnant}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Pregnant
           </label>
           </div>
<div class="col-md-4" >        
         <input
            name="isAbortionMiscarriage"
            type="checkbox"
            checked={this.state.isAbortionMiscarriage}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
           Abortion/Miscarriage
           </label>
           </div>
           <div class="col-md-4" style={{paddingTop:"10"}}>        
            <input
            name="isHotFlashes"
            type="checkbox"
            checked={this.state.isHotFlashes}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
         Hot Flashes
           </label>
           </div>
           

           </div>

 <div class="row" style={{paddingTop:"10px"}}>  
           <div class="col-md-4" style={{paddingTop:"10"}}>        
             <input
            name="isBreastLump"
            type="checkbox"
            checked={this.state.isBreastLump}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
         Breast Lump
           </label>
           </div>
<div class="col-md-4" >        
   <input
            name="isBreastFeeding"
            type="checkbox"
            checked={this.state.isBreastFeeding}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
         Breast Feeding
           </label>
           </div>
           <div class="col-md-4" style={{paddingTop:"10"}}>        
          <input
            name="isUterinBleeding"
            type="checkbox"
            checked={this.state.isUterinBleeding}
            onChange={this.handleInputChange} />
           <label style={{paddingLeft:"15px"}} >
         Uterus Bleeding
           </label>
           </div>
           

           </div>           
            
          </div>
            
          
        ) : null}

        
 <div class="row px-2 mt-1 d-flex justify-content-end" style={{padding:"20px"}}>



    
      
              <div class="col-md-2 px-1">

          <button  onClick={()=>{this.onCreateHistory()}} class="w-100 border-0 shadow btn btn-primary cc-btn" >Save</button>
        </div>
        

</div>
      </div>
    
      </>
    );
  }
}
// export default AddHistory;

