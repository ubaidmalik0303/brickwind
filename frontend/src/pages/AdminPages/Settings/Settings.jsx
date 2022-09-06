import React from "react";
import SettingsStyles from "./settings.module.css";

const Settings = () => {
  return(
    <div className={SettingsStyles.settings}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <input type="file" accept="image/*" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
