/**
 * This is a designtime component, but also used in runtime design.
 **/
import React from "react";
import { Modal } from "react-bootstrap";
import LoaderButton from "../components/loader-button";
import { useFormFields } from "../libs/custom-hooks";
import apiWrapper from "../libs/api-wrapper";

function SaveCaseDefinition({
  currentCase,
  tasks,
  showDefModal,
  setShowDefModal,
  currentCaseStatus,
  setCurrentCaseStatus,
}) {
  //  console.log(currentCase);

  return (
    <Modal
      className="container-fluid"
      show={showDefModal}
      onHide={(e) => setShowDefModal(false)}
      key={currentCase.id}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>{currentCase.name}</h3>
          <h6>{currentCase.description}</h6>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CaseDefinitionForm
          currentCase={currentCase}
          tasks={tasks}
          setShowDefModal={setShowDefModal}
          currentCaseStatus={currentCaseStatus}
          setCurrentCaseStatus={setCurrentCaseStatus}
        />
      </Modal.Body>
    </Modal>
  );
}

function CaseDefinitionForm({
  currentCase,
  tasks,
  setShowDefModal,
  currentCaseStatus,
  setCurrentCaseStatus,
}) {
  const [caseDefinition, setCaseDefinition] = useFormFields(currentCase);

  console.log("ready to save currentCase");
  currentCase.planItems = tasks;
  console.log(currentCase);
  function close() {
    setShowDefModal(false);
  }
  function handleSubmit(event) {
    event.preventDefault();
    const valid = validateForm();
    if (valid) submitForm();
  }

  function validateForm() {
    if (caseDefinition.name.length === 0) {
      alert("Name cannot be empty");
      return false;
    }
    return true;
  }

  async function submitForm() {
    let path = `/case-definitions/`;
    let resp = await apiWrapper.post(path, caseDefinition);
    let caseDevCreateResp = resp.data;
    console.log("saved caseDefinition:");
    console.log(caseDefinition);
    console.log("caseDevCreateResp: " + caseDevCreateResp);
    setCurrentCaseStatus(caseDefinition.name);

    console.log("setCurrentCaseStatus called and set to: " + currentCaseStatus);

    close();
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="row">
      <h5 className="col-12">Save As Case Definition</h5>
      <hr />
      <div className="form-group col-6">
        <label>Case Definition Name</label>
        <input
          className="form-control"
          name="name"
          value={caseDefinition.name}
          onChange={setCaseDefinition}
        />
      </div>
      <div className="form-group col-12">
        <label>Case description</label>
        <textarea
          className="form-control"
          name="description"
          value={caseDefinition.description}
          onChange={setCaseDefinition}
        />
      </div>
      <hr />
      <h5 className="col-12">TODO: Change more fields for a case Definition</h5>
      <hr />

      <div className="modal-footer col-12">
        <button className="btn-secondary" onClick={close}>
          Cancel
        </button>
        <LoaderButton className="btn-success" onClick={(e) => handleSubmit(e)}>
          Save For Reuse
        </LoaderButton>
      </div>
    </form>
  );
}

export default SaveCaseDefinition;
