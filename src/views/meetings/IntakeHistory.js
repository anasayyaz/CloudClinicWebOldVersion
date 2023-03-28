import React, { useState, useEffect,useContext } from "react";
import TranslationContext from "../../context/translation";
import list, { put, post } from "../../_helper/api";
import "./EditVitalSign.css";

const IntakeHistory = (props) => {
  const [IntakeData, setIntakeData] = useState([]);
  const [showFSD, setShowFSD] = useState(false);
  const { translate } = useContext(TranslationContext)
  useEffect(() => {



    list(`history/getVisitForHistory/${props.consultant}`).then((response) => {

        if (response.data.patientGender === "Female") {
          setShowFSD(true);
        } else {
          setShowFSD(false);
        }
      });
  
      list(`History/getPatientHistorybyVisit/${props.consultant}`).then((response) => {
        setIntakeData(response.data);
        console.log(response.data);
      });
  }, [props.consultant]);

  return (
   <div>
        <div className="w-100 form-group row">
                <h4 class="control-label col-md-3" htmlFor="Patient">
                {translate("PATIENT_NAME")}:
                </h4>
                <h4 class="col-sm-3">{IntakeData.patientFirstName}{" "}{IntakeData.patientLastName}</h4>
                <h4 class="control-label col-md-3" htmlFor="Patient">
                {translate("PATIENT_ID")}:
                </h4>
                <h4 class="col-sm-3">{IntakeData.patient_NationalID}</h4>
              </div>

              <div>
                <h4>I - {translate("CHIEF_COMPALINTS")} </h4>
                <hr></hr>

                <div class="row">
                  <div class="col-md-3">
                    <input
                      name="isFever"
                      type="checkbox"
                      checked={IntakeData.isFever}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("FEVER")}</label>
                  </div>

                  <div class="col-md-3">
                    <input
                      name="isShortnessofBreath"
                      type="checkbox"
                      checked={IntakeData.isShortnessofBreath}
                    />
                    <label style={{ paddingLeft: "5px" }}>
                    {translate("SHORTNESS_OF_BREATH")}
                    </label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isHeadache"
                      type="checkbox"
                      checked={IntakeData.isHeadache}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("HEADACHE")}</label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isBackache"
                      type="checkbox"
                      checked={IntakeData.isBackache}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("BACKACHE")}</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <input
                      name="isChestPain"
                      type="checkbox"
                      checked={IntakeData.isChestPain}
                    />

                    <label style={{ paddingLeft: "5px" }}>{translate("CHESTPAIN")}</label>
                  </div>

                  <div class="col-md-3">
                    <input
                      name="isStomachPain"
                      type="checkbox"
                      checked={IntakeData.isStomachPain}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("STOMACHPAIN")}</label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isWeaknessGeneralized"
                      type="checkbox"
                      checked={IntakeData.isWeaknessGeneralized}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("WEAKNESS")}</label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isWeightLoss"
                      type="checkbox"
                      checked={IntakeData.isWeightLoss}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("WEIGHTLOSS")}</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <input
                      name="iscough"
                      type="checkbox"
                      checked={IntakeData.iscough}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("COUGH")}</label>
                  </div>

                  <div class="col-md-3">
                    <input
                      name="isVomiting"
                      type="checkbox"
                      checked={IntakeData.isVomiting}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("VOMITING")}</label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isDiarrhea"
                      type="checkbox"
                      checked={IntakeData.isDiarrhea}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("DIARRHEA")}</label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isLossofConsciousness"
                      type="checkbox"
                      checked={IntakeData.isLossofConsciousness}
                    />
                    <label style={{ paddingLeft: "5px" }}>
                    {translate("LOSS_OF_CONSCIOUSNESS")}
                    </label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <input
                      name="isStroke"
                      type="checkbox"
                      checked={IntakeData.isStroke}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("STROKE")}</label>
                  </div>

                  <div class="col-md-3">
                    <input
                      name="isHBP"
                      type="checkbox"
                      checked={IntakeData.isHBP}
                    />
                    <label style={{ paddingLeft: "5px" }}>
                    {translate("HIGH_BLOOD_PRESSURE")}
                    </label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isAbnormalLabTest"
                      type="checkbox"
                      checked={IntakeData.isAbnormalLabTest}
                    />
                    <label style={{ paddingLeft: "5px" }}>
                    {translate("ABNORMAL_LAB_TEST")}
                    </label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="anyOtherComplaint"
                      type="checkbox"
                      checked={IntakeData.anyOtherComplaint}
                    />
                    <label style={{ paddingLeft: "5px" }}>
                    {translate("ANY_OTHER_COMPLAINT")}
                    </label>
                  </div>
                </div>
                <div class="row">
                  <div className="col-md-3">
                    <h5>{translate("FOR_HOW_LONG")}: </h5>
                  </div>

                  <div className="col-md-9">
                    <div className="input-container">
                      <input type="text" value={IntakeData.forHowLong} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4>II - {translate("ANY_OTHER_COMPLAINT")}</h4>
                <hr></hr>
                <div class="row">
                  <div class="col-md-3">
                    <input
                      name="isSeizure"
                      type="checkbox"
                      checked={IntakeData.isSeizure}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("SEIZURE")}</label>
                  </div>

                  <div class="col-md-3">
                    <input
                      name="isMuscleWeakDis"
                      type="checkbox"
                      checked={IntakeData.isMuscleWeakDis}
                    />
                    <label style={{ paddingLeft: "5px" }}>
                    {translate("MUSCLE_WEAKNESS")}
                    </label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isSleepDisturbance"
                      type="checkbox"
                      checked={IntakeData.isSleepDisturbance}
                    />
                    <label style={{ paddingLeft: "5px" }}>
                    {translate("SLEEP_DISTURBANCE")}
                    </label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isEyeProblem"
                      type="checkbox"
                      checked={IntakeData.isEyeProblem}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("EYE_PROBLEM")}</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <input
                      name="isEarProblem"
                      type="checkbox"
                      checked={IntakeData.isEarProblem}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("EAR_PROBLEM")}</label>
                  </div>

                  <div class="col-md-3">
                    <input
                      name="isNoseProblem"
                      type="checkbox"
                      checked={IntakeData.isNoseProblem}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("NOSE_PROBLEM")}</label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isThroatProblem"
                      type="checkbox"
                      checked={IntakeData.isThroatProblem}
                    />
                    <label style={{ paddingLeft: "5px" }}>
                    {translate("THROAT_PROBLEM")}
                    </label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isDentalPrblem"
                      type="checkbox"
                      checked={IntakeData.isDentalPrblem}
                    />
                    <label style={{ paddingLeft: "5px" }}>
                    {translate("DENTAL_PROBLEM")}
                    </label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <input
                      name="isMouthProblem"
                      type="checkbox"
                      checked={IntakeData.isMouthProblem}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("MOUTH_PROBLEM")}</label>
                  </div>

                  <div class="col-md-3">
                    <input
                      name="isThyroidProblem"
                      type="checkbox"
                      checked={IntakeData.isthyroidProblem}
                    />
                    <label style={{ paddingLeft: "5px" }}>
                    {translate("THYROID_PROBLEM")}
                    </label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isHeartDisease"
                      type="checkbox"
                      checked={IntakeData.isHeartDisease}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("HEART_PROBLEM")}</label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isHeartRacing"
                      type="checkbox"
                      checked={IntakeData.isHeartRacing}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("HEART_RACING")}</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <input
                      name="isLungDisease"
                      type="checkbox"
                      checked={IntakeData.isLungDisease}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("LUNG_DISEASE")}</label>
                  </div>

                  <div class="col-md-3">
                    <input
                      name="isLeverDisease"
                      type="checkbox"
                      checked={IntakeData.isLeverDisease}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("LIVER_DISEASE")}</label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isJaundice"
                      type="checkbox"
                      checked={IntakeData.isJaundice}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("JAUNDICE")}</label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isHepatitis"
                      type="checkbox"
                      checked={IntakeData.isHepatitis}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("HEPATITIS")}</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <input
                      name="isSwallingProblem"
                      type="checkbox"
                      checked={IntakeData.isSwallingProblem}
                    />
                    <label style={{ paddingLeft: "5px" }}>
                    {translate("SWALLOWING_PROBLEM")}
                    </label>
                  </div>

                  <div class="col-md-3">
                    <input
                      name="isHeartBurn"
                      type="checkbox"
                      checked={IntakeData.isHeartBurn}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("HEART_BURN")}</label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isBloodinStool"
                      type="checkbox"
                      checked={IntakeData.isBloodinStool}
                    />
                    <label style={{ paddingLeft: "5px" }}>
                    {translate("BLOOD_IN_STOOL")}
                    </label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isSwollenFeet"
                      type="checkbox"
                      checked={IntakeData.isSwollenFeet}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("SWOLLEN_FEET")}</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <input
                      name="isFacialPuffiness"
                      type="checkbox"
                      checked={IntakeData.isFacialPuffiness}
                    />
                    <label style={{ paddingLeft: "5px" }}>
                    {translate("FACIAL_PUFFINESS")}
                    </label>
                  </div>

                  <div class="col-md-3">
                    <input
                      name="isKidneyDisease"
                      type="checkbox"
                      checked={IntakeData.isKidneyDisease}
                    />
                    <label style={{ paddingLeft: "5px" }}>
                    {translate("KIDNEY_DISEASE")}
                    </label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isBurningUrine"
                      type="checkbox"
                      checked={IntakeData.isBurningUrine}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("BURNING_URINE")}</label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isBloodinUrine"
                      type="checkbox"
                      checked={IntakeData.isBloodinUrine}
                    />
                    <label style={{ paddingLeft: "5px" }}>
                    {translate("BLOOD_IN_URINE")}
                    </label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <input
                      name="isKidneyStones"
                      type="checkbox"
                      checked={IntakeData.isKidneyStones}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("KIDNEY_STONES")}</label>
                  </div>

                  <div class="col-md-3">
                    <input
                      name="isBoneDisease"
                      type="checkbox"
                      checked={IntakeData.isBoneDisease}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("BONE_DISEASE")}</label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isJointSwellingPain"
                      type="checkbox"
                      checked={IntakeData.isJointSwellingPain}
                    />
                    <label style={{ paddingLeft: "5px" }}>
                    {translate("JOINT_SWELLING_PAIN")}
                    </label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isSkinRash"
                      type="checkbox"
                      checked={IntakeData.isSkinRash}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("SKIN_RASH")}</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <input
                      name="isSkinDisease"
                      type="checkbox"
                      checked={IntakeData.isSkinDisease}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("SKIN_DISEASE")}</label>
                  </div>

                  <div class="col-md-3">
                    <input
                      name="isDiabetes"
                      type="checkbox"
                      checked={IntakeData.isDiabetes}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("DIABETES")}</label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isAnemia"
                      type="checkbox"
                      checked={IntakeData.isAnemia}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("ANEMIA")}</label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isBloodDisease"
                      type="checkbox"
                      checked={IntakeData.isBloodDisease}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("BLOOD_DISEASE")}</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <input
                      name="isBleedingProblem"
                      type="checkbox"
                      checked={IntakeData.isBleedingProblem}
                    />
                    <label style={{ paddingLeft: "5px" }}>
                    {translate("BLEEDING_PROBLEM")}
                    </label>
                  </div>

                  <div class="col-md-3">
                    <input
                      name="isTumor"
                      type="checkbox"
                      checked={IntakeData.isTumor}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("TUMOR")}</label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isCancer"
                      type="checkbox"
                      checked={IntakeData.isCancer}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("CANCER")}</label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isMentalDisease"
                      type="checkbox"
                      checked={IntakeData.isMentalDisease}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("CANCER")}</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <input
                      name="isDementia"
                      type="checkbox"
                      checked={IntakeData.isDementia}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("DEMENTIA")}</label>
                  </div>

                  <div class="col-md-3">
                    <input
                      name="isPsychologicalProblem"
                      type="checkbox"
                      checked={IntakeData.isPsychologicalProblem}
                    />
                    <label style={{ paddingLeft: "5px" }}>
                    {translate("PSYCHOLOGICAL_PROBLEM")}
                    </label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isAddiction"
                      type="checkbox"
                      checked={IntakeData.isAddiction}
                    />
                    <label style={{ paddingLeft: "5px" }}>Addiction</label>
                  </div>
                </div>
              </div>

              <div>
                <h4>III - {translate("CURRENT_MEDICATION")}</h4>
                <hr></hr>
                <div class="row">
                  <div className="col-md-12">
                    <div class="row">
                      <div className="col-md-3">
                        <h5>{translate("CURRENT_MEDICATION")}: </h5>
                      </div>

                      <div className="col-md-9">
                        <div className="input-container">
                          <input
                            type="text"
                            value={IntakeData.currentMedications}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div className="col-md-3">
                        <h5>{translate("FREQUENCY")}: </h5>
                      </div>

                      <div className="col-md-9">
                        <div className="input-container">
                          <input
                            type="text"
                            value={IntakeData.medicineFrequency}
                          />
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div className="col-md-3">
                        <h5>{translate("DOSAGE")}: </h5>
                      </div>

                      <div className="col-md-9">
                        <div className="input-container">
                          <input
                            type="text"
                            value={IntakeData.medicineDosage}
                          />
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div className="col-md-3">
                        <h5>{translate("FORM")}: </h5>
                      </div>

                      <div className="col-md-9">
                        <div className="input-container">
                          <input type="text" value={IntakeData.medicineForm} />
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
                  <div className="col-md-3">
                    <h5>{translate("ALLERGIES")}: </h5>
                  </div>

                  <div className="col-md-9">
                    <div className="input-container">
                      <input type="text" value={IntakeData.allergies} />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div className="col-md-3">
                    <h5>{translate("IMMUNIZATIONS")}: </h5>
                  </div>

                  <div className="col-md-9">
                    <div className="input-container">
                      <input type="text" value={IntakeData.immunization} />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div className="col-md-3">
                    <h5>{translate("SURGERIES_OPERATIONS")}: </h5>
                  </div>

                  <div className="col-md-9">
                    <div className="input-container">
                      <input
                        type="text"
                        value={IntakeData.surgeriesOperations}
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div className="col-md-3">
                    <h5>{translate("ACCIDENT")}: </h5>
                  </div>

                  <div className="col-md-9">
                    <div className="input-container">
                      <input type="text" value={IntakeData.anymoreaccident} />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" style={{ paddingTop: "10px" }}>
                <div class="col-md-3">
                  <input
                    name="isBloodTransfusion"
                    type="checkbox"
                    checked={IntakeData.isBloodTransfusion}
                  />
                  <label style={{ paddingLeft: "5px" }}>
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
                      <h6 style={{ paddingTop: "10px" }}>
                      {translate("PROFESSION_JOB")}: {IntakeData.Profession}
                      </h6>
                    </div>
                  </div>
                </div>

                <div class="row" style={{ paddingTop: "10px" }}>
                  <div class="col-md-3" style={{ paddingTop: "10" }}>
                    <input
                      name="isSmooking"
                      type="checkbox"
                      checked={IntakeData.isSmooking}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("SMOKING")}</label>
                  </div>
                  <div class="col-md-3">
                    <input
                      name="isDrinking"
                      type="checkbox"
                      checked={IntakeData.isDrinking}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("DRINKING")}</label>
                  </div>
                  <div class="col-md-3" style={{ paddingTop: "10" }}>
                    <input
                      name="isDrugs"
                      type="checkbox"
                      checked={IntakeData.isDrugs}
                    />
                    <label style={{ paddingLeft: "5px" }}>{translate("DRUGS")}</label>
                  </div>
                </div>
              </div>

              <div>
                <h4>VI - {translate("FAMILY_HISTORY")}</h4>
                <hr></hr>
                <div class="row">
                  <div className="col-md-6">
                    <h5>{translate("FAIMLY_MEMBER_HAVING_SAME_MEDICAL_PROBLEMS")}: </h5>
                  </div>

                  <div className="col-md-6">
                    <div className="input-container">
                      <input
                        type="text"
                        value={IntakeData.familyMemberSameMedicalProblems}
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div className="col-md-6">
                    <h5>{translate("FAIMLY_MEMBER_HAVING_NOTEABLE_ILLNESS")}: </h5>
                  </div>

                  <div className="col-md-6">
                    <div className="input-container">
                      <input
                        type="text"
                        value={IntakeData.familyMembersHavingNotableIllness}
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div className="col-md-6">
                    <h5>{translate("FAIMLY_MEMBER_DIED_FOR_SPECIFC_ILLNESS")}: </h5>
                  </div>

                  <div className="col-md-6">
                    <div className="input-container">
                      <input
                        type="text"
                        value={IntakeData.familyMembersDiedSpecificIllness}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {showFSD ? (
                <div>
                  <h4>VII - {translate("FEMALE_SECTION_ONLY")}</h4>
                  <hr></hr>
                  <div class="row">
                    <div className="col-md-3">
                      <div className="input-container">
                        <text type="text">
                          {IntakeData.numberofpregnancies}
                        </text>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div className="input-container">
                        <text type="text">{IntakeData.ageatmenstruation}</text>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div className="input-container">
                        <text type="text">{IntakeData.ageofmenopaise}</text>
                      </div>
                    </div>
                  </div>

                  <div class="row" style={{ paddingTop: "10px" }}>
                    <div class="col-md-3">
                      <div className="input-container">
                        <h6>
                        {translate("LAST_MENSTRUAL_PERIOD")}:{" "}
                          {IntakeData.lastmenstrualperiod}
                        </h6>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div className="input-container">
                        <h6>{translate("LAST_PAP_SMEAR")}: {IntakeData.lastpapsmear}</h6>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div className="input-container">
                        <h6>{translate("LAST_MAMOGRAM")}: {IntakeData.lastmemogram}</h6>
                      </div>
                    </div>
                  </div>

                  <div class="row" style={{ paddingTop: "10px" }}>
                    <div class="col-md-3" style={{ paddingTop: "10" }}>
                      <input
                        name="isPregnant"
                        type="checkbox"
                        checked={IntakeData.isPregnant}
                      />
                      <label style={{ paddingLeft: "5px" }}>{translate("PREGNANT")}</label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isAbortionMiscarriage"
                        type="checkbox"
                        checked={IntakeData.isAbortionMiscarriage}
                      />
                      <label style={{ paddingLeft: "5px" }}>
                      {translate("ABORTION_MISCARRIAGE")}
                      </label>
                    </div>
                    <div class="col-md-3" style={{ paddingTop: "10" }}>
                      <input
                        name="isHotFlashes"
                        type="checkbox"
                        checked={IntakeData.isHotFlashes}
                      />
                      <label style={{ paddingLeft: "5px" }}>{translate("HOT_FLASHES")}</label>
                    </div>
                  </div>

                  <div class="row" style={{ paddingTop: "10px" }}>
                    <div class="col-md-3" style={{ paddingTop: "10" }}>
                      <input
                        name="isBreastLump"
                        type="checkbox"
                        checked={IntakeData.isBreastLump}
                      />
                      <label style={{ paddingLeft: "5px" }}>{translate("BREAST_LUMP")}</label>
                    </div>
                    <div class="col-md-3">
                      <input
                        name="isBreastFeeding"
                        type="checkbox"
                        checked={IntakeData.isBreastFeeding}
                      />
                      <label style={{ paddingLeft: "5px" }}>
                      {translate("BREAST_FEEDING")}
                      </label>
                    </div>
                    <div class="col-md-3" style={{ paddingTop: "10" }}>
                      <input
                        name="isUterinBleeding"
                        type="checkbox"
                        checked={IntakeData.isUterinBleeding}
                      />
                      <label style={{ paddingLeft: "5px" }}>
                      {translate("UTERUS_BLEEDING")}
                      </label>
                    </div>
                  </div>
                </div>
              ) : null}
         
   </div>
  );
};
export default IntakeHistory;
