import React from 'react';

const DashboardWelcome = () => {
  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-h-screen">
      <div className="tw-text-center -tw-mt-28">
        <h1 className="tw-text-2xl tw-font-bold tw-mb-4">Welcome to the Balia Dashboard</h1>
        <p className="tw-text-gray-600">
          You can navigate to the pages on the left to manage the content.
        </p>
      </div>
    </div>
  );
};

export default DashboardWelcome;