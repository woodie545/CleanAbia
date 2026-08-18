import React, { useState, useMemo } from 'react';
import { FaRegBell, FaSackDollar, FaXmark } from "react-icons/fa6";
import { RxStopwatch, RxHamburgerMenu } from 'react-icons/rx';
import { GrLocationPin } from 'react-icons/gr';

const CATEGORY_LABELS = {
  overflowing_bin: 'Overflowing bin',
  illegal_dumping: 'Illegal dumping',
  blocked_drainage: 'Blocked drainage',
  drainage_clearance: 'Drainage clearance',
  waste_collection: 'Waste collection',
  other: 'Other',
};

function timeAgo(dateString) {
  if (!dateString) return '';
  const diffMs = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? '' : 's'} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

export default function Abiaproj({
  toggleMobileMenu,
  profile,
  jobs = [],
  myJobs = [],
  earnings,
  onAcceptJob,
  onCompleteJob,
}) {
  const [selectedJobModal, setSelectedJobModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [busyJobId, setBusyJobId] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // The agent's current job in progress (accepted but not yet completed).
  const activeJob = useMemo(
    () => myJobs.find((j) => ['accepted', 'in_progress'].includes(j.status)),
    [myJobs]
  );

  const completedJobs = useMemo(
    () => myJobs.filter((j) => ['completed', 'confirmed'].includes(j.status)),
    [myJobs]
  );

  const completedThisWeek = useMemo(() => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return completedJobs.filter(
      (j) => j.completed_at && new Date(j.completed_at) >= weekAgo
    ).length;
  }, [completedJobs]);

  const totalEarnings = earnings?.earnings || 0;

  async function handleAcceptJob(job) {
    setBusyJobId(job.id);
    try {
      await onAcceptJob?.(job.id);
      showToast(`Job accepted: ${job.reports?.title || job.job_code}`);
      setSelectedJobModal(null);
    } catch (err) {
      showToast(err.message || 'Failed to accept job.');
    } finally {
      setBusyJobId(null);
    }
  }

  async function handleCompleteJob(job) {
    setBusyJobId(job.id);
    try {
      await onCompleteJob?.(job.id);
      showToast('Job marked complete!');
    } catch (err) {
      showToast(err.message || 'Failed to complete job.');
    } finally {
      setBusyJobId(null);
    }
  }

  return (
    <main className='w-full min-h-screen relative font-sans'>

      {toastMessage && (
        <div className='fixed top-5 right-5 z-50 bg-[#123A28] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3'>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className='text-xs opacity-75 hover:opacity-100'>✕</button>
        </div>
      )}

      <section className='w-full bg-[#E4EEE7] p-4 sm:p-8 overflow-x-hidden min-h-screen'>
        {/* Header Bar */}
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <button
              onClick={toggleMobileMenu}
              className='md:hidden p-2 text-2xl text-[#123A28] focus:outline-none'
              aria-label="Open menu"
            >
              <RxHamburgerMenu />
            </button>
            <h1 className='text-xl sm:text-3xl font-serif text-[#123A28]'>
              Welcome Back, {profile?.full_name ? profile.full_name.split(' ')[0] : 'Agent'}
            </h1>
          </div>
          <button
            className='p-3 bg-white hover:bg-gray-50 active:scale-95 transition-all rounded-full shadow-sm shrink-0 relative'
          >
            <FaRegBell className='text-lg text-[#123A28]' />
            {jobs.length > 0 && (
              <span className='absolute top-1 right-1 bg-red-500 w-2.5 h-2.5 rounded-full'></span>
            )}
          </button>
        </div>
        <p className='text-[#5B6B60] text-sm mt-1 sm:mt-0 pl-11 md:pl-0'>
          {jobs.length} open job offer{jobs.length === 1 ? '' : 's'} nearby.
        </p>

        {/* Stats Grid */}
        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6'>
          <div className='bg-[#FFFFFF] rounded-xl p-4 space-y-2 shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            <p className='text-[#5B6B60] text-sm'>Jobs Completed</p>
            <p className='font-bold text-2xl text-[#123A28]'>{completedJobs.length}</p>
            <p className='text-[#1E5B3E] text-sm font-medium'>
              {completedThisWeek > 0 ? `+${completedThisWeek} this week` : 'None this week yet'}
            </p>
          </div>
          <div className='bg-[#FFFFFF] rounded-xl p-4 space-y-2 shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            <p className='text-[#5B6B60] text-sm'>Total Earnings</p>
            <p className='font-bold text-2xl text-[#123A28]'>{formatCurrency(totalEarnings)}</p>
            <p className='text-[#1E5B3E] text-sm font-medium'>All time</p>
          </div>
          <div className='bg-[#FFFFFF] rounded-xl p-4 space-y-2 shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            <p className='text-[#5B6B60] text-sm'>Open Offers</p>
            <p className='font-bold text-2xl text-[#123A28]'>{jobs.length}</p>
            <p className='text-[#1E5B3E] text-sm font-medium'>Ready to accept</p>
          </div>
          <div className='bg-[#FFFFFF] rounded-xl p-4 space-y-2 shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            <p className='text-[#5B6B60] text-sm'>Active Job</p>
            <p className='font-semibold text-lg text-[#103a27] truncate'>
              {activeJob ? (activeJob.reports?.title || activeJob.job_code) : 'None'}
            </p>
            <p className='text-[#1E5B3E] text-sm font-medium'>
              {activeJob ? 'In progress' : 'Ready for work'}
            </p>
          </div>
        </section>

        {/* Main Content Sections */}
        <section className='flex flex-col xl:flex-row gap-5'>

          {/* Left Side: Open Job Offers */}
          <section className='bg-[#FFFFFF] rounded-xl py-5 px-4 sm:px-7 w-full xl:w-[70%] shadow-lg border border-gray-100'>
            <div className='flex justify-between items-center pb-2 border-b border-gray-100'>
              <p className='text-lg font-bold text-[#123A28]'>Open job offers</p>
            </div>

            {jobs.length === 0 && (
              <p className='text-[#5B6B60] text-sm py-8 text-center'>
                No open job offers right now — check back soon.
              </p>
            )}

            {jobs.map((job) => {
              const report = job.reports;
              const isBusy = busyJobId === job.id;
              return (
                <div
                  key={job.id}
                  className='border rounded-xl mb-3 mt-4 py-5 px-4 sm:px-6 space-y-3 transition-all border-gray-300 bg-white hover:border-[#1E5B3E]'
                >
                  <div className='flex justify-between flex-wrap gap-2 mb-1'>
                    <h3 className='font-bold text-gray-800'>{report?.title || job.job_code}</h3>
                    <p className='text-[#5B6B60] text-xs sm:text-sm'>{timeAgo(job.created_at)}</p>
                  </div>

                  <p className='font-semibold py-1 px-3 text-xs sm:text-sm rounded-full w-max bg-blue-100 text-blue-800'>
                    NEW OFFER
                  </p>

                  <p className='text-[#5B6B60] text-sm leading-relaxed'>{report?.description}</p>

                  <div className='flex flex-wrap gap-4 sm:gap-7 pt-1'>
                    <div className='flex gap-1 items-center'>
                      <GrLocationPin className='text-[#123A28]' />
                      <p className='text-sm text-[#5B6B60]'>{report?.address || report?.lga}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <FaSackDollar className='text-orange-500' />
                      <p className='text-sm text-[#5B6B60]'>{formatCurrency(job.payout_amount)}</p>
                    </div>
                    {job.estimated_minutes && (
                      <div className='flex gap-1 items-center'>
                        <RxStopwatch className='text-gray-600' />
                        <p className='text-[#5B6B60] text-sm'>{job.estimated_minutes} min job</p>
                      </div>
                    )}
                  </div>

                  <div className='flex flex-wrap gap-3 sm:gap-4 pt-3'>
                    <button
                      onClick={() => handleAcceptJob(job)}
                      disabled={isBusy || !!activeJob}
                      title={activeJob ? 'Finish your active job first' : undefined}
                      className='bg-amber-400 hover:bg-amber-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-semibold rounded-full px-6 py-2 text-sm sm:text-base text-[#123A28] transition-all shadow-sm'
                    >
                      {isBusy ? 'Accepting...' : 'Accept job'}
                    </button>
                    <button
                      onClick={() => setSelectedJobModal(job)}
                      className='font-semibold rounded-full px-6 py-2 border border-black hover:bg-gray-100 active:scale-95 text-sm sm:text-base transition-all'
                    >
                      View details
                    </button>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Right Side Panel */}
          <section className='w-full xl:w-[30%] space-y-5'>

            {/* Active Job Panel */}
            <div className='p-5 sm:p-7 bg-white rounded-xl shadow-lg border border-gray-100'>
              <h2 className='font-bold text-lg text-[#123A28]'>Active job</h2>

              <div className='h-40 sm:h-48 w-full bg-gradient-to-r from-[#1E5B3E] to-[#123A28] rounded-2xl my-4 relative overflow-hidden flex items-center justify-center p-4 text-center text-white'>
                <div className='absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]'></div>
                <div className='relative z-10'>
                  <GrLocationPin className='text-4xl text-amber-400 mx-auto mb-1' />
                  <p className='font-medium text-xs text-emerald-200'>
                    {activeJob ? 'JOB IN PROGRESS' : 'NO ACTIVE JOB'}
                  </p>
                  <p className='font-bold text-sm'>
                    {activeJob ? (activeJob.reports?.title || activeJob.job_code) : 'Accept an offer to start'}
                  </p>
                </div>
              </div>

              {activeJob ? (
                <>
                  <p className='text-[#5B6B60] mb-4 text-sm'>{activeJob.reports?.description}</p>

                  <div className='space-y-3 mb-5'>
                    {(activeJob.job_events || [])
                      .slice()
                      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                      .map((event) => (
                        <div key={event.id} className='flex gap-3 items-start'>
                          <p className='rounded-full p-1 w-3.5 h-3.5 mt-1 shrink-0 bg-[#1E5B3E]'></p>
                          <div>
                            <p className='font-bold text-sm text-gray-900 capitalize'>
                              {event.event_type.replace('_', ' ')}
                            </p>
                            <p className='text-[#5B6B60] text-xs'>
                              {new Date(event.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>

                  <button
                    onClick={() => handleCompleteJob(activeJob)}
                    disabled={busyJobId === activeJob.id}
                    className='w-full py-2.5 bg-[#123A28] hover:bg-[#1E5B3E] disabled:opacity-60 text-white rounded-xl font-medium transition-colors text-sm shadow-sm'
                  >
                    {busyJobId === activeJob.id ? 'Marking complete...' : 'Mark job complete'}
                  </button>
                </>
              ) : (
                <div className='text-center py-6 text-gray-500 text-sm'>
                  No job in progress. Accept an open offer to start tracking.
                </div>
              )}
            </div>

            {/* Earnings Summary */}
            <div className='bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100'>
              <p className='text-lg font-bold text-[#123A28] text-center sm:text-left'>Total earnings</p>
              <p className='text-center text-3xl sm:text-4xl font-extrabold text-[#123A28] my-6'>
                {formatCurrency(totalEarnings)}
              </p>
              <p className='text-center text-[#5B6B60] text-xs'>
                View the Earnings tab to withdraw to your bank.
              </p>
            </div>
          </section>
        </section>
      </section>

      {/* View Details Modal */}
      {selectedJobModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs'>
          <div className='bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4'>

            <div className='flex justify-between items-start border-b pb-3'>
              <div>
                <h3 className='text-xl font-bold text-[#123A28]'>
                  {selectedJobModal.reports?.title || selectedJobModal.job_code}
                </h3>
                <p className='text-sm text-gray-500'>Posted {timeAgo(selectedJobModal.created_at)}</p>
              </div>
              <button
                onClick={() => setSelectedJobModal(null)}
                className='text-gray-400 hover:text-gray-700 p-1 rounded-lg'
              >
                <FaXmark className='text-xl' />
              </button>
            </div>

            <div className='space-y-3 text-sm'>
              <div className='flex justify-between bg-emerald-50 p-3 rounded-xl text-[#123A28]'>
                <div>
                  <p className='text-xs text-gray-500 uppercase font-semibold'>Payout</p>
                  <p className='text-lg font-bold text-orange-600'>
                    {formatCurrency(selectedJobModal.payout_amount)}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='text-xs text-gray-500 uppercase font-semibold'>Location</p>
                  <p className='text-base font-bold'>{selectedJobModal.reports?.address}</p>
                </div>
              </div>

              <div>
                <h4 className='font-bold text-gray-700 mb-1'>Description</h4>
                <p className='text-gray-600 leading-relaxed'>{selectedJobModal.reports?.description}</p>
              </div>

              <div className='border-t pt-3 space-y-2'>
                <p><span className='font-semibold text-gray-700'>Category:</span> {CATEGORY_LABELS[selectedJobModal.reports?.category] || selectedJobModal.reports?.category}</p>
                <p><span className='font-semibold text-gray-700'>Priority:</span> <span className='capitalize'>{selectedJobModal.reports?.priority}</span></p>
                <p><span className='font-semibold text-gray-700'>LGA:</span> {selectedJobModal.reports?.lga}</p>
              </div>
            </div>

            <div className='flex gap-3 pt-4 border-t'>
              <button
                onClick={() => handleAcceptJob(selectedJobModal)}
                disabled={busyJobId === selectedJobModal.id || !!activeJob}
                className='flex-1 bg-amber-400 hover:bg-amber-500 disabled:opacity-50 font-bold py-2.5 rounded-xl text-[#123A28] transition-colors text-center shadow-sm'
              >
                {busyJobId === selectedJobModal.id ? 'Accepting...' : 'Accept Job Now'}
              </button>
              <button
                onClick={() => setSelectedJobModal(null)}
                className='px-5 border border-gray-300 font-semibold py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
