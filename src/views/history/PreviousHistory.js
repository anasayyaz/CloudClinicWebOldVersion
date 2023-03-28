import React, { useEffect, useState, createRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import list, {put, post} from "../../_helper/api";
import TranslationContext from "../../context/translation";

class PreviousHistory extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.state = {
        Patient_NationalID: '',
      patientData: null,
      visitData:null,
      //history form input
      painScale: '',
      fever: '',
      weaknesss: '',
      shortnessOfBreath: '',
      weightLoss: '',
      swollenGlands: '',
      currentMedications: '',
      allergies: '',
      immunization: "",
      birthproblems: '',
      childhoodillness: '',
      anymoreaccident: '',
      bloodtransfusion: '',
      psychatricillness: '',
      expiredfamilymembers: '',
      anyfamilymemberswithdisease: '',
      smoking: '',
      drinking: '',
      recreational: '',
      ageatmenstruation: '',
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
      forHowLong: '',
      surgeriesOperations: '',
      familyMembersHavingNotableIllness: '',
      familyMembersDiedSpecificIllness: '',
      isFever: '',
      feverRange: '',
      isShortnessofBreath: '',
      isHeadache: '',
      headacheRange: '',
      isBackache:'',
      backacheRange: '',
      isChestPain: '',
      chestPainRange: '',
      isStomachPain:'',
      stomachPainRange: '',
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
      isSmooking: '',
      isDrinking: '',
      isDrugs: '',
      isPregnant: '',
      isAbortionMiscarriage:'',
      isHotFlashes: '',
      isBreastFeeding: '',
      isUterinBleeding: '',
      isBreastLump:'',
      patient: '',
           Profession:'',
 medicineFrequency:"",
        medicineDosage: "",
        medicineForm: "",

showFS:true,
showFSD:false,

count:1,





      //history
      nameHistory:'',
      genderHistory:'',
      id:'',
      //API DATA
      historyID: '',
      
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {

    this.setState({ [event.target.id]: event.target.value });
  }

 
 



 
  operationDetailFS() {
    this.setState({
      showFS: !this.state.showFS,
      showFSD: !this.state.showFSD,
    });
  }

 


   componentDidMount = () => {

         list(`history/getVisitForHistory/${this.props.match.params.id}`)   
           .then((response)=>{
            if (response.data.patientGender === "Female") {
              this.setState({showFSD:true});
            } else {
                this.setState({showFSD:false});
            }
            this.setState({
            nameHistory:response.data.patient,
           id:response.data.patient_NationalID,
           genderHistory:response.data.patientGender,
       
          });
        })


          list(`History/getPatientHistorybyVisit/${this.props.match.params.id}`)   
           .then((response)=>{
           
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
      abortion:response.data.abortion,
      numberoflivebriths:response.data.numberoflivebriths,
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
      forHowLong: response.data.forHowLong,
      surgeriesOperations: response.data.surgeriesOperations,
      familyMembersHavingNotableIllness: response.data.familyMembersHavingNotableIllness,
      familyMembersDiedSpecificIllness: response.data.familyMembersDiedSpecificIllness,
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
      isSkinDisease:response.data.isSkinDisease,
      isDiabetes: response.data.isDiabetes,
      isAnemia: response.data.isAnemia,
      isBloodDisease: response.data.isBloodDisease,
      isBleedingProblem: response.data.isBleedingProblem,
      isTumor: response.data.isTumor,
      isCancer: response.data.isCancer,
      isMentalDisease:response.data.isMentalDisease,
      isDementia: response.data.isDementia,
      isPsychologicalProblem: response.data.isPsychologicalProblem,
      isAddiction: response.data.isAddiction,
      isBloodTransfusion:response.data.isBloodTransfusion,
      isSmooking: response.data.isSmooking,
      isDrinking: response.data.isDrinking,
      isDrugs: response.data.isDrugs,
      isPregnant: response.data.isPregnant,
      isAbortionMiscarriage:response.data.isAbortionMiscarriage,
      isHotFlashes: response.data.isHotFlashes,
      isBreastFeeding: response.data.isBreastFeeding,
      isUterinBleeding: response.data.isUterinBleeding,
      isBreastLump:response.data.isBreastLump,
      patient: response.data.patient,
      Profession:response.data.Profession,
      medicineDosage:response.data.medicineDosage,
      medicineFrequency:response.data.medicineFrequency,
      medicineForm:response.data.medicineForm,
       
          });
        })
  }

  render() {
    const { translate } = this.context;
   
    return (
           <div class="container px-4 col-12 m-0 pt-4 h-100 overflow-auto">
        <div className="form-group row">
        <h4 class="control-label col-sm-2" htmlFor="Patient">{translate("PATIENT_NAME")}:</h4>
          <h4 class="col-sm-3">
          {this.state.nameHistory} 
        </h4>
          <h4 class="control-label col-sm-2" htmlFor="Patient">{translate("PATIENT_ID")}:</h4>
          <h4 class="col-sm-3">
          {this.state.id} 
        </h4>
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
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("FEVER")}
           </label>
           </div>

            <div class="col-md-3">     
             <input
            name="isShortnessofBreath"
            type="checkbox"
            checked={this.state.isShortnessofBreath}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("SHORTNESS_OF_BREATH")}
           </label>
           </div>
            <div class="col-md-3">        
           <input
            name="isHeadache"
            type="checkbox"
            checked={this.state.isHeadache}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("HEADACHE")}
           </label>
           </div>
            <div class="col-md-3">        
           <input
            name="isBackache"
            type="checkbox"
            checked={this.state.isBackache}
            />
           <label style={{paddingLeft:"15px"}} >
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
            />
            
           <label style={{paddingLeft:"15px"}} >
           {translate("CHESTPAIN")}
           </label>
           </div>

            <div class="col-md-3">        
            <input
            name="isStomachPain"
            type="checkbox"
            checked={this.state.isStomachPain}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("STOMACHPAIN")}
           </label>
           </div>
            <div class="col-md-3">        
           <input
            name="isWeaknessGeneralized"
            type="checkbox"
            checked={this.state.isWeaknessGeneralized}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("WEAKNESS")}
           </label>
           </div>
            <div class="col-md-3">        
            <input
            name="isWeightLoss"
            type="checkbox"
            checked={this.state.isWeightLoss}
            />
           <label style={{paddingLeft:"15px"}} >
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
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("COUGH")}
           </label>
           </div>

            <div class="col-md-3">        
                           <input
            name="isVomiting"
            type="checkbox"
            checked={this.state.isVomiting}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("VOMITING")}
           </label>

           </div>
            <div class="col-md-3">        
                            <input
            name="isDiarrhea"
            type="checkbox"
            checked={this.state.isDiarrhea}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("DIARRHEA")}
           </label>
           </div>
            <div class="col-md-3">        
                            <input
            name="isLossofConsciousness"
            type="checkbox"
            checked={this.state.isLossofConsciousness}
            />
           <label style={{paddingLeft:"15px"}} >
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
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("STROKE")}
           </label>
           </div>

            <div class="col-md-3">        
                            <input
            name="isHBP"
            type="checkbox"
            checked={this.state.isHBP}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("HIGH_BLOOD_PRESSURE")}
           </label>
           </div>
            <div class="col-md-3">        
                            <input
            name="isAbnormalLabTest"
            type="checkbox"
            checked={this.state.isAbnormalLabTest}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("ABNORMAL_LAB_TEST")}
           </label>
           </div>
            <div class="col-md-3">        
               <input
            name="anyOtherComplaint"
            type="checkbox"
            checked={this.state.anyOtherComplaint}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("ANY_OTHER_COMPLAINT")}
           </label>
           </div>

           

           
</div>
      <div class="row">  
            <div  className="col-md-3">  
                      <h5 >{translate("FOR_HOW_LONG")}:  </h5> 

      
           </div>

    <div className="col-md-9">
                <div className="input-container">    
           <input type="text" value={this.state.forHowLong} />
      </div>
           </div>
 
         
                 
            
                  

</div>

          </div>
   
     
           <div>
  <h4>II - Other Complaints</h4>
        <hr></hr>
        <div class="row">  
           <div class="col-md-3">        
            <input
            name="isSeizure"
            type="checkbox"
            checked={this.state.isSeizure}
            />
           <label style={{paddingLeft:"15px"}} >
            {translate("SEIZURE")}
           </label>
           </div>

            <div class="col-md-3">        
           <input
            name="isMuscleWeakDis"
            type="checkbox"
            checked={this.state.isMuscleWeakDis}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("MUSCLE_WEAKNESS")}
           </label>
           </div>
            <div class="col-md-3">        
            <input
            name="isSleepDisturbance"
            type="checkbox"
            checked={this.state.isSleepDisturbance}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("SLEEP_DISTURBANCE")}
           </label>
           </div>
            <div class="col-md-3">        
           <input
            name="isEyeProblem"
            type="checkbox"
            checked={this.state.isEyeProblem}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("EYE_PROBLEM")}
           </label>
           </div>

           

           
</div>
<div class="row">  
           <div class="col-md-3">        
             <input
            name="isEarProblem"
            type="checkbox"
            checked={this.state.isEarProblem}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("EAR_PROBLEM")}
           </label>
           </div>

            <div class="col-md-3">        
             <input
            name="isNoseProblem"
            type="checkbox"
            checked={this.state.isNoseProblem}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("NOSE_PROBLEM")}
           </label>
           </div>
            <div class="col-md-3">        
             <input
            name="isThroatProblem"
            type="checkbox"
            checked={this.state.isThroatProblem}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("THROAT_PROBLEM")}
           </label>
           </div>
            <div class="col-md-3">        
             <input
            name="isDentalPrblem"
            type="checkbox"
            checked={this.state.isDentalPrblem}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("DENTAL_PROBLEM")}
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
           <label style={{paddingLeft:"15px"}} >
           {translate("MOUTH_PROBLEM")}
           </label>
           </div>

            <div class="col-md-3">        
             <input
            name="isThyroidProblem"
            type="checkbox"
            checked={this.state.isthyroidProblem}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("THYROID_PROBLEM")}
           </label>
           </div>
            <div class="col-md-3">        
             <input
            name="isHeartDisease"
            type="checkbox"
            checked={this.state.isHeartDisease}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("HEART_PROBLEM")}
           </label>
           </div>
            <div class="col-md-3">        
            <input
            name="isHeartRacing"
            type="checkbox"
            checked={this.state.isHeartRacing}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("HEART_RACING")}
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
           <label style={{paddingLeft:"15px"}} >
           {translate("LUNG_DISEASE")}
           </label>
           </div>

            <div class="col-md-3">        
           <input
            name="isLeverDisease"
            type="checkbox"
            checked={this.state.isLeverDisease}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("LIVER_DISEASE")}
           </label>
           </div>
            <div class="col-md-3">        
           <input
            name="isJaundice"
            type="checkbox"
            checked={this.state.isJaundice}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("JAUNDICE")}
           </label>
           </div>
            <div class="col-md-3">        
              <input
            name="isHepatitis"
            type="checkbox"
            checked={this.state.isHepatitis}
            />
           <label style={{paddingLeft:"15px"}} >
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
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("SWALLOWING_PROBLEM")}
           </label>
           </div>

            <div class="col-md-3">        
            <input
            name="isHeartBurn"
            type="checkbox"
            checked={this.state.isHeartBurn}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("HEART_BURN")}
           </label>
           </div>
            <div class="col-md-3">        
            <input
            name="isBloodinStool"
            type="checkbox"
            checked={this.state.isBloodinStool}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("BLOOD_IN_STOOL")}
           </label>
           </div>
            <div class="col-md-3">        
           <input
            name="isSwollenFeet"
            type="checkbox"
            checked={this.state.isSwollenFeet}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("SWOLLEN_FEET")}
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
           <label style={{paddingLeft:"15px"}} >
           {translate("FACIAL_PUFFINESS")}
           </label>
           </div>

            <div class="col-md-3">        
            <input
            name="isKidneyDisease"
            type="checkbox"
            checked={this.state.isKidneyDisease}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("KIDNEY_DISEASE")}
           </label>
           </div>
            <div class="col-md-3">        
            <input
            name="isBurningUrine"
            type="checkbox"
            checked={this.state.isBurningUrine}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("BURNING_URINE")}
           </label>
           </div>
            <div class="col-md-3">        
           <input
            name="isBloodinUrine"
            type="checkbox"
            checked={this.state.isBloodinUrine}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("BLOOD_IN_URINE")}
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
           <label style={{paddingLeft:"15px"}} >
           {translate("KIDNEY_STONES")}
           </label>
           </div>

            <div class="col-md-3">        
           <input
            name="isBoneDisease"
            type="checkbox"
            checked={this.state.isBoneDisease}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("BONE_DISEASE")}
           </label>
           </div>
            <div class="col-md-3">        
         <input
            name="isJointSwellingPain"
            type="checkbox"
            checked={this.state.isJointSwellingPain}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("JOINT_SWELLING_PAIN")}
           </label>
           </div>
            <div class="col-md-3">        
           <input
            name="isSkinRash"
            type="checkbox"
            checked={this.state.isSkinRash}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("SKIN_RASH")}
           </label>
           </div>

           

           
</div>
<div class="row">  
           <div class="col-md-3">        
             <input
            name="isSkinDisease"
            type="checkbox"
            checked={this.state.isSkinDisease}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("SKIN_DISEASE")}
           </label>
           </div>

            <div class="col-md-3">        
              <input
            name="isDiabetes"
            type="checkbox"
            checked={this.state.isDiabetes}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("DIABETES")}
           </label>
           </div>
            <div class="col-md-3">        
             <input
            name="isAnemia"
            type="checkbox"
            checked={this.state.isAnemia}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("ANEMIA")}
           </label>
           </div>
            <div class="col-md-3">        
              <input
            name="isBloodDisease"
            type="checkbox"
            checked={this.state.isBloodDisease}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("BLOOD_DISEASE")}
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
           <label style={{paddingLeft:"15px"}} >
           {translate("BLEEDING_PROBLEM")}
           </label>
           </div>

            <div class="col-md-3">        
           <input
            name="isTumor"
            type="checkbox"
            checked={this.state.isTumor}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("TUMOR")}
           </label>
           </div>
            <div class="col-md-3">        
            <input
            name="isCancer"
            type="checkbox"
            checked={this.state.isCancer}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("CANCER")}
           </label>
           </div>
            <div class="col-md-3">        
         <input
            name="isMentalDisease"
            type="checkbox"
            checked={this.state.isMentalDisease}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("CANCER")}
           </label>
           </div>

           

           
</div>
<div class="row">  
           <div class="col-md-3">        
           <input
            name="isDementia"
            type="checkbox"
            checked={this.state.isDementia}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("DEMENTIA")}
           </label>
           </div>

            <div class="col-md-3">        
         <input
            name="isPsychologicalProblem"
            type="checkbox"
            checked={this.state.isPsychologicalProblem}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("PSYCHOLOGICAL_PROBLEM")}
           </label>
           </div>
            <div class="col-md-3">        
           <input
            name="isAddiction"
            type="checkbox"
            checked={this.state.isAddiction}
            />
           <label style={{paddingLeft:"15px"}} >
           Addiction
           </label>
          
           </div>
           

           

           
</div>
</div>
 
            <div>
<h4>III - {translate("CURRENT_MEDICATION")}</h4>
        <hr></hr>
       <div class="row">
     <div className="col-md-12">
               
                 <div class="row">  
            <div  className="col-md-3">  
                      <h5 >{translate("CURRENT_MEDICATION")}:  </h5> 

      
           </div>

    <div className="col-md-9">
                <div className="input-container">    
           <input type="text" value={this.state.currentMedications} />
      </div>
           </div>
         
                 
            
                  

</div>
  <div class="row">  
            <div  className="col-md-3">  
                      <h5 >{translate("FREQUENCY")}:  </h5> 

      
           </div>

    <div className="col-md-9">
                <div className="input-container">    
           <input type="text" value={this.state.medicineFrequency} />
      </div>
           </div>
         
                 
            
                  

</div>
  
        
       
       <div class="row">  
            <div  className="col-md-3">  
                      <h5 >{translate("DOSAGE")}:  </h5> 

      
           </div>

    <div className="col-md-9">
                <div className="input-container">    
           <input type="text" value={this.state.medicineDosage} />
      </div>
           </div>
         
                 
            
                  

</div>
   
           <div class="row">  
            <div  className="col-md-3">  
                      <h5 >{translate("FORM")}:  </h5> 

      
           </div>

    <div className="col-md-9">
                <div className="input-container">    
           <input type="text" value={this.state.medicineForm} />
      </div>
           </div>
         
                 
            
                  

</div>

    
        </div>
        </div>
        </div>
       
            <div>
<h4>IV – {translate("OTHER_DETAILS")}</h4>
        <hr></hr>
        
              <div class="row">  
            <div  className="col-md-3">  
                      <h5 >{translate("ALLERGIES")}:  </h5> 

      
           </div>

    <div className="col-md-9">
                <div className="input-container">    
           <input type="text" value={this.state.allergies} />
      </div>
           </div>
         
                 
            
                  

</div>

         <div class="row">  
            <div  className="col-md-3">  
                      <h5 >{translate("IMMUNIZATIONS")}:  </h5> 

      
           </div>

    <div className="col-md-9">
                <div className="input-container">    
           <input type="text" value={this.state.immunization} />
      </div>
           </div>
         
                 
            
                  

</div>
            <div class="row">  
            <div  className="col-md-3">  
                      <h5 >{translate("SURGERIES_OPERATIONS")}:  </h5> 

      
           </div>

    <div className="col-md-9">
                <div className="input-container">    
           <input type="text" value={this.state.surgeriesOperations} />
      </div>
           </div>
         
                 
            
                  

</div>
             <div class="row">  
            <div  className="col-md-3">  
                      <h5 >{translate("ACCIDENT")}:  </h5> 

      
           </div>

    <div className="col-md-9">
                <div className="input-container">    
           <input type="text" value={this.state.anymoreaccident} />
      </div>
           </div>
         
                 
            
                  

</div>
           </div>
           <div class="row" style={{paddingTop:"10px"}}>  
           <div class="col-md-3" >        
           <input
            name="isBloodTransfusion"
            type="checkbox"
            checked={this.state.isBloodTransfusion}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("BLOOD_TRANSFUSION")}
           </label>
           </div>

           

           </div>
      
     
              <div>
<h4>V - Personal</h4>
        <hr></hr>
        <div class="row">  
           <div className="col-md-12">
                <div className="input-container">   
                 <h6 style={{paddingTop:"10px"}}>{translate("PROFESSION_JOB")}: {this.state.Profession}</h6>    
            </div>
      
           </div>

           
           </div>
           
           <div class="row" style={{paddingTop:"10px"}}>  
           <div class="col-md-4" style={{paddingTop:"10"}}>        
          <input
            name="isSmooking"
            type="checkbox"
            checked={this.state.isSmooking}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("SMOKING")}
           </label>
           </div>
<div class="col-md-4" >        
           <input
            name="isDrinking"
            type="checkbox"
            checked={this.state.isDrinking}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("DRINKING")}
           </label>
           </div>
           <div class="col-md-4" style={{paddingTop:"10"}}>        
          <input
            name="isDrugs"
            type="checkbox"
            checked={this.state.isDrugs}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("DRUGS")}
           </label>
           </div>
           

           </div>
           </div>
   
               <div>
           <h4>VI - {translate("FAMILY_HISTORY")}</h4>
        <hr></hr>
         <div class="row">  
            <div  className="col-md-6">  
                      <h5 >{translate("FAIMLY_MEMBER_HAVING_SAME_MEDICAL_PROBLEMS")}:  </h5> 

      
           </div>

    <div className="col-md-6">
                <div className="input-container">    
           <input type="text" value={this.state.SameMedicalProblems} />
      </div>
           </div>
         
                 
            
                  

</div>
           <div class="row">  
            <div  className="col-md-6">  
                      <h5 >{translate("FAIMLY_MEMBER_HAVING_NOTEABLE_ILLNESS")}: </h5> 

      
           </div>

    <div className="col-md-6">
                <div className="input-container">    
           <input type="text" value={this.state.familyMembersHavingNotableIllness} />
      </div>
           </div>
         
                 
            
                  

</div>
          <div class="row">  
            <div  className="col-md-6">  
                      <h5 >{translate("FAIMLY_MEMBER_DIED_FOR_SPECIFC_ILLNESS")}:  </h5> 

      
           </div>

    <div className="col-md-6">
                <div className="input-container">    
           <input type="text" value={this.state.familyMembersDiedSpecificIllness} />
      </div>
           </div>
         
                 
            
                  

</div>
           
           

      
</div>
    
       
       {this.state.showFS ? (
                <div></div>
            )  : null}           
              {this.state.showFSD ? (
       
           <div>

            <h4>VII - {translate("FEMALE_SECTION_ONLY")}</h4>
            <hr></hr>
                <div class="row">  
                    <div className="col-md-4">
                <div className="input-container">      
             <text type="text"      >{this.state.numberofpregnancies}</text>
      </div>
           </div>
           <div class="col-md-4">        
                 <div className="input-container">   
            <text type="text"      >{this.state.ageatmenstruation}</text>
      </div>
           </div>
           <div class="col-md-4">   
                 <div className="input-container">        
             <text type="text"       >{this.state.ageofmenopaise}</text>
      </div>
           </div>

           
           </div>
           
           <div class="row" style={{paddingTop:"10px"}}>  
           <div class="col-md-4">    
              <div className="input-container">        
           <h6>{translate("LAST_MENSTRUAL_PERIOD")}: {this.state.lastmenstrualperiod}</h6>    
             </div>
      
           </div>
           <div class="col-md-4">    
                   <div className="input-container">       
            <h6>{translate("LAST_PAP_SMEAR")}: {this.state.lastpapsmear}</h6>    
           </div>
           </div>
           <div class="col-md-4">    
                   <div className="input-container">       
             <h6>{translate("LAST_MAMOGRAM")}: {this.state.lastmemogram}</h6>    
      </div>
           </div>

           
           

           </div>

             <div class="row" style={{paddingTop:"10px"}}>  
           <div class="col-md-4" style={{paddingTop:"10"}}>        
             <input
            name="isPregnant"
            type="checkbox"
            checked={this.state.isPregnant}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("PREGNANT")}
           </label>
           </div>
<div class="col-md-4" >        
         <input
            name="isAbortionMiscarriage"
            type="checkbox"
            checked={this.state.isAbortionMiscarriage}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("ABORTION_MISCARRIAGE")}
           </label>
           </div>
           <div class="col-md-4" style={{paddingTop:"10"}}>        
            <input
            name="isHotFlashes"
            type="checkbox"
            checked={this.state.isHotFlashes}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("HOT_FLASHES")}
           </label>
           </div>
           

           </div>

 <div class="row" style={{paddingTop:"10px"}}>  
           <div class="col-md-4" style={{paddingTop:"10"}}>        
             <input
            name="isBreastLump"
            type="checkbox"
            checked={this.state.isBreastLump}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("BREAST_LUMP")}
           </label>
           </div>
<div class="col-md-4" >        
   <input
            name="isBreastFeeding"
            type="checkbox"
            checked={this.state.isBreastFeeding}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("BREAST_FEEDING")}
           </label>
           </div>
           <div class="col-md-4" style={{paddingTop:"10"}}>        
          <input
            name="isUterinBleeding"
            type="checkbox"
            checked={this.state.isUterinBleeding}
            />
           <label style={{paddingLeft:"15px"}} >
           {translate("UTERUS_BLEEDING")}
           </label>
           </div>
           

           </div>           
            
          </div>
            
        ) : null}
            
          
        
 
      </div>
      
    );
  }
}
export default PreviousHistory;
