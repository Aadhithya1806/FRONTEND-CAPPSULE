import React, { useState, useEffect } from "react";
import Card from "./Card";

const DisplayInfoCard = ({ salt }) => {
    const saltFormsList = Object.keys(salt.salt_forms_json);
    const saltStrengthList = Object.keys(
        salt.salt_forms_json[saltFormsList[0]]
    );
    const saltPackingList = Object.keys(
        salt.salt_forms_json[saltFormsList[0]][saltStrengthList[0]]
    );

    const [selectedSalt, setSelectedSalt] = useState({
        form: saltFormsList[0],
        strength: saltStrengthList[0],
        packing: saltPackingList[0],
    });

    const [availability, setAvailability] = useState({
        isAvailable: false,
        lowestPrice: null,
    });

    const [showAllForms, setShowAllForms] = useState(false);
    const [showAllStrengths, setShowAllStrengths] = useState(false);
    const [showAllPackings, setShowAllPackings] = useState(false);

    const updateAvailability = (form, strength, packing) => {
        const pharmacies = salt.salt_forms_json[form][strength][packing];
        let available = false;
        let lowestPrice = null;

        for (const pharmacyId in pharmacies) {
            const pharmacy = pharmacies[pharmacyId];
            if (pharmacy !== null) {
                available = true;
                pharmacy.forEach((entry) => {
                    if (
                        lowestPrice === null ||
                        entry.selling_price < lowestPrice
                    ) {
                        lowestPrice = entry.selling_price;
                    }
                });
            }
        }

        setAvailability({
            isAvailable: available,
            lowestPrice,
        });
    };

    useEffect(() => {
        updateAvailability(
            selectedSalt.form,
            selectedSalt.strength,
            selectedSalt.packing
        );
    }, [selectedSalt]);

    const formHandler = (form) => {
        const newStrengthList = Object.keys(salt.salt_forms_json[form]);
        const newPackingList = Object.keys(
            salt.salt_forms_json[form][newStrengthList[0]]
        );
        setSelectedSalt({
            form,
            strength: newStrengthList[0],
            packing: newPackingList[0],
        });
        updateAvailability(form, newStrengthList[0], newPackingList[0]);
    };

    const strengthHandler = (strength) => {
        const newPackingList = Object.keys(
            salt.salt_forms_json[selectedSalt.form][strength]
        );
        setSelectedSalt((prev) => ({
            ...prev,
            strength,
            packing: newPackingList[0],
        }));
        updateAvailability(selectedSalt.form, strength, newPackingList[0]);
    };

    const packHandler = (packing) => {
        setSelectedSalt((prev) => ({
            ...prev,
            packing,
        }));
        updateAvailability(selectedSalt.form, selectedSalt.strength, packing);
    };

    const selectedClass =
        "px-3 py-1 text-sm font-semibold border-2 border-darkBlue rounded m-1 shadow-buttonShadow";
    const notSelectedClass =
        "px-3 py-1 border text-sm font-semibold border-borderNotSelected text-textNotSelected border-2 border-stone-400 rounded m-1";
    const unavailableNotSelected =
        "px-2 py-1 font-semibold text-sm text-stone-400 border border-2 border-dashed border-stone-400 rounded m-1";
    const unavailableSelected =
        "px-3 py-1 font-semibold text-sm border border-2 border-darkBlue border-dashed rounded m-1";

    return (
        <Card>
            <div className="flex flex-col justify-center align-middle w-full md:w-3/5 lg:w-2/5 mx-auto p-2">
                <div className="flex">
                    <p className="m-1 p-1 text-stone-950 text-left">Form: </p>
                    <div className="ml-9">
                        {saltFormsList
                            .slice(0, showAllForms ? saltFormsList.length : 4)
                            .map((form) => (
                                <button
                                    onClick={() => formHandler(form)}
                                    className={
                                        selectedSalt.form === form
                                            ? selectedClass
                                            : notSelectedClass
                                    }
                                    key={form}
                                >
                                    {form}
                                </button>
                            ))}
                        {saltFormsList.length > 4 && (
                            <p
                                onClick={() => setShowAllForms(!showAllForms)}
                                className="more-less text-darkBlue font-semibold ml-1"
                            >
                                {showAllForms ? "Less..." : "More..."}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex">
                    <p className="m-1 p-1 text-stone-950 text-left">
                        Strength:{" "}
                    </p>
                    <div className="ml-3">
                        {saltFormsList.map((form) =>
                            form === selectedSalt.form
                                ? Object.keys(salt.salt_forms_json[form])
                                      .slice(
                                          0,
                                          showAllStrengths
                                              ? Object.keys(
                                                    salt.salt_forms_json[form]
                                                ).length
                                              : 4
                                      )
                                      .map((strength) => (
                                          <button
                                              onClick={() =>
                                                  strengthHandler(strength)
                                              }
                                              className={
                                                  selectedSalt.strength ===
                                                  strength
                                                      ? availability.isAvailable
                                                          ? selectedClass
                                                          : unavailableSelected
                                                      : selectedSalt.strength !=
                                                            strength &&
                                                        availability.isAvailable
                                                      ? notSelectedClass
                                                      : unavailableNotSelected
                                              }
                                              key={strength}
                                          >
                                              {strength}
                                          </button>
                                      ))
                                : null
                        )}
                        {Object.keys(salt.salt_forms_json[selectedSalt.form])
                            .length > 4 && (
                            <p
                                onClick={() =>
                                    setShowAllStrengths(!showAllStrengths)
                                }
                                className="more-less text-darkBlue font-semibold ml-1"
                            >
                                {showAllStrengths ? "Less..." : "More..."}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex">
                    <p className="m-1 p-1 text-stone-950 text-left">
                        Packing:{" "}
                    </p>
                    <div className="ml-3">
                        {saltFormsList.map((form) =>
                            form === selectedSalt.form
                                ? Object.keys(salt.salt_forms_json[form]).map(
                                      (strength) =>
                                          strength === selectedSalt.strength
                                              ? Object.keys(
                                                    salt.salt_forms_json[form][
                                                        strength
                                                    ]
                                                )
                                                    .slice(
                                                        0,
                                                        showAllPackings
                                                            ? Object.keys(
                                                                  salt
                                                                      .salt_forms_json[
                                                                      form
                                                                  ][strength]
                                                              ).length
                                                            : 4
                                                    )
                                                    .map((packing) => (
                                                        <button
                                                            onClick={() =>
                                                                packHandler(
                                                                    packing
                                                                )
                                                            }
                                                            className={
                                                                selectedSalt.packing ===
                                                                packing
                                                                    ? availability.isAvailable
                                                                        ? selectedClass // 1. available and matching
                                                                        : unavailableSelected // 2. not available but matching
                                                                    : availability.isAvailable
                                                                    ? notSelectedClass // 4. available and not matching
                                                                    : unavailableNotSelected // 3. not available and not matching
                                                            }
                                                            key={packing}
                                                        >
                                                            {packing}
                                                        </button>
                                                    ))
                                              : null
                                  )
                                : null
                        )}
                        {Object.keys(
                            salt.salt_forms_json[selectedSalt.form][
                                selectedSalt.strength
                            ]
                        ).length > 4 && (
                            <p
                                onClick={() =>
                                    setShowAllPackings(!showAllPackings)
                                }
                                className="more-less text-darkBlue font-semibold ml-1"
                            >
                                {showAllPackings ? "Less..." : "More..."}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center w-full md:w-1/2 lg:w-1/3 mx-auto align-middle p-2">
                <p className="self-center text-salt font-semibold text-lg">
                    {salt.salt.split("+")[0]}
                </p>
                <p className="self-center text-darkBlue text-sm font-medium">
                    {selectedSalt.form} | {selectedSalt.strength} |{" "}
                    {selectedSalt.packing}
                </p>
            </div>
            <div className="flex flex-col justify-center align-middle w-full md:w-1/2 lg:w-1/3 mx-auto p-2">
                {availability.isAvailable ? (
                    <p className="text-darkBlue font-extrabold text-2xl self-center">
                        From ₹{availability.lowestPrice}
                    </p>
                ) : (
                    <div className="m-2 p-5 border border-3 border-greenBg rounded-md bg-white self-center">
                        <p className="text-center text-sm font-semibold text-textNotSelected">
                            No Store is selling this product near you.
                        </p>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default DisplayInfoCard;
