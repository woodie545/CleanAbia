import React, { useState } from 'react';
import { FaRegBell, FaSackDollar, FaXmark } from "react-icons/fa6";
import { BsGrid } from "react-icons/bs";
import { LuCircleDollarSign } from 'react-icons/lu';
import { GoPerson, GoStack } from 'react-icons/go';
import { RxStopwatch, RxHamburgerMenu, RxCross2 } from 'react-icons/rx';
import { GrLocationPin } from 'react-icons/gr';

// Initial Mock Data
const INITIAL_JOBS = [
  {
    id: 'job-1',
    title: 'Ogbor Hill Rd, Aba South',
    timeAgo: '2 min ago',
    badge: 'NEW OFFER',
    badgeType: 'new',
    description: 'Overflowing bin blocking pedestrian walkway. Confirmed by admin.',
    location: '1.2km away',
    payout: '₦2,500 est.',
    estimatedTime: '30 min job',
    fullDetails: {
      category: 'Waste Collection',
      reportedBy: 'Admin (System Auto-detection)',
      priority: 'High',
      notes: 'Requires heavy-duty gloves and standard collection bags. Site needs quick disposal.'
    }
  },
  {
    id: 'job-2',
    title: 'Milverton Rd, Aba North',
    timeAgo: '18 min ago',
    badge: 'NEW OFFER',
    badgeType: 'new',
    description: 'Blocked drainage causing waterlogging near junction.',
    location: '3.4km away',
    payout: '₦3,200 est.',
    estimatedTime: '45 min job',
    fullDetails: {
      category: 'Drainage Clearance',
      reportedBy: 'Community Leader',
      priority: 'Urgent',
      notes: 'Debris needs to be extracted and packed into sacks provided at the local collection hub.'
    }
  },
  {
    id: 'job-3',
    title: 'Ndoni St, Umuahia',
    timeAgo: '1 hr ago',
    badge: 'CLAIMED',
    badgeType: 'claimed',
    description: 'Claimed by Agent Ifeoma B, — no longer available.',
    location: '8.1km away',
    payout: '₦2,000 est.',
    estimatedTime: '20 min job',
    fullDetails: null
  }
];

export default function Abiaproj({ toggleMobileMenu, profile }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Overview');
  
  // State for Jobs & Active Assignment
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [activeJob, setActiveJob] = useState({
    title: 'Faulks Rd Market',
    subtitle: 'Recyclables drop-off pending confirmation',
    timeline: [
      { status: 'Job accepted', time: 'Today, 9:14am', done: true },
      { status: 'Site cleared', time: 'Today, 10:02am', done: true },
      { status: 'Drop-off confirmed & paid', time: 'Pending', done: false }
    ]
  });

  // State for Modals & Notifications
  const [selectedJobModal, setSelectedJobModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handle Accepting a Job
  const handleAcceptJob = (job) => {
    if (job.badgeType === 'claimed') return;

    // Set as new active job
    setActiveJob({
      title: job.title,
      subtitle: job.description,
      timeline: [
        { status: 'Job accepted', time: 'Just now', done: true },
        { status: 'Site cleared', time: 'Pending', done: false },
        { status: 'Drop-off confirmed & paid', time: 'Pending', done: false }
      ]
    });

    // Mark job as claimed/removed in list
    setJobs((prevJobs) =>
      prevJobs.map((j) =>
        j.id === job.id
          ? {
              ...j,
              badge: 'CLAIMED',
              badgeType: 'claimed',
              description: 'Accepted by you — active job in progress.'
            }
          : j
      )
    );

    // Close modal if open
    if (selectedJobModal) {
      setSelectedJobModal(null);
    }

    showToast(`Successfully accepted job: ${job.title}`);
  };

  return (
    <main className='w-full min-h-screen relative font-sans'>
      
      {/* Dynamic Notification Toast */}
      {toastMessage && (
        <div className='fixed top-5 right-5 z-50 bg-[#123A28] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce'>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className='text-xs opacity-75 hover:opacity-100'>✕</button>
        </div>
      )}

      {/* ....................... Main Body ...................................... */}
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
              Welcome Back, {profile?.name ? profile.name.split(' ')[0] : 'Agent'}
            </h1>
          </div>
          <button 
            onClick={() => showToast("You have 3 unread notifications")}
            className='p-3 bg-white hover:bg-gray-50 active:scale-95 transition-all rounded-full shadow-sm shrink-0 relative'
          >
            <FaRegBell className='text-lg text-[#123A28]' />
            <span className='absolute top-1 right-1 bg-red-500 w-2.5 h-2.5 rounded-full'></span>
          </button>
        </div>
        <p className='text-[#5B6B60] text-sm mt-1 sm:mt-0 pl-11 md:pl-0'>
          {jobs.filter(j => j.badgeType === 'new').length} new job offers near Aba South.
        </p>

        {/* Stats Grid */}
        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6'>
          <div className='bg-[#FFFFFF] rounded-xl p-4 space-y-2 shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            <p className='text-[#5B6B60] text-sm'>Jobs Completed</p>
            <p className='font-bold text-2xl text-[#123A28]'>58</p>
            <p className='text-[#1E5B3E] text-sm font-medium'>+4 this week</p>
          </div>
          <div className='bg-[#FFFFFF] rounded-xl p-4 space-y-2 shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            <p className='text-[#5B6B60] text-sm'>Total Earnings</p>
            <p className='font-bold text-2xl text-[#123A28]'>₦312,000</p>
            <p className='text-[#1E5B3E] text-sm font-medium'>This year</p>
          </div>
          <div className='bg-[#FFFFFF] rounded-xl p-4 space-y-2 shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            <p className='text-[#5B6B60] text-sm'>Rating</p>
            <p className='font-bold text-2xl text-[#123A28]'>4.9</p>
            <p className='text-[#1E5B3E] text-sm font-medium'>From 52 reviews</p>
          </div>
          <div className='bg-[#FFFFFF] rounded-xl p-4 space-y-2 shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            <p className='text-[#5B6B60] text-sm'>Active Job</p>
            <p className='font-semibold text-lg text-[#103a27] truncate'>
              {activeJob ? activeJob.title : 'None'}
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
              <button 
                onClick={() => showToast("Opening interactive map view...")}
                className='text-[#123A28] font-semibold text-sm hover:underline'
              >
                View map
              </button>
            </div>

            {/* Render Job Cards */}
            {jobs.map((job) => (
              <div 
                key={job.id} 
                className={`border rounded-xl mb-3 mt-4 py-5 px-4 sm:px-6 space-y-3 transition-all ${
                  job.badgeType === 'claimed' 
                    ? 'border-gray-200 bg-gray-50/50 opacity-75' 
                    : 'border-gray-300 bg-white hover:border-[#1E5B3E]'
                }`}
              >
                <div className='flex justify-between flex-wrap gap-2 mb-1'>
                  <h3 className='font-bold text-gray-800'>{job.title}</h3>
                  <p className='text-[#5B6B60] text-xs sm:text-sm'>{job.timeAgo}</p>
                </div>

                <p className={`font-semibold py-1 px-3 text-xs sm:text-sm rounded-full w-max ${
                  job.badgeType === 'new' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {job.badge}
                </p>

                <p className='text-[#5B6B60] text-sm leading-relaxed'>{job.description}</p>

                <div className='flex flex-wrap gap-4 sm:gap-7 pt-1'>
                  <div className='flex gap-1 items-center'>
                    <GrLocationPin className={job.badgeType === 'claimed' ? 'text-gray-400' : 'text-[#123A28]'} />
                    <p className={`text-sm ${job.badgeType === 'claimed' ? 'text-gray-400' : 'text-[#5B6B60]'}`}>{job.location}</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <FaSackDollar className='text-orange-500' />
                    <p className={`text-sm ${job.badgeType === 'claimed' ? 'text-gray-400' : 'text-[#5B6B60]'}`}>{job.payout}</p>
                  </div>
                  {job.estimatedTime && (
                    <div className='flex gap-1 items-center'>
                      <RxStopwatch className='text-gray-600' />
                      <p className='text-[#5B6B60] text-sm'>{job.estimatedTime}</p>
                    </div>
                  )}
                </div>

                {job.badgeType !== 'claimed' && (
                  <div className='flex flex-wrap gap-3 sm:gap-4 pt-3'>
                    <button 
                      onClick={() => handleAcceptJob(job)}
                      className='bg-amber-400 hover:bg-amber-500 active:scale-95 font-semibold rounded-full px-6 py-2 text-sm sm:text-base text-[#123A28] transition-all shadow-sm'
                    >
                      Accept job
                    </button>
                    <button 
                      onClick={() => setSelectedJobModal(job)}
                      className='font-semibold rounded-full px-6 py-2 border border-black hover:bg-gray-100 active:scale-95 text-sm sm:text-base transition-all'
                    >
                      View details
                    </button>
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Right Side Panel */}
          <section className='w-full xl:w-[30%] space-y-5'>
            
            {/* Active Job Timeline Panel */}
            <div className='p-5 sm:p-7 bg-white rounded-xl shadow-lg border border-gray-100'>
              <h2 className='font-bold text-lg text-[#123A28]'>Active job</h2>

              {/* Decorative Map Card */}
              <div className='h-40 sm:h-48 w-full bg-gradient-to-r from-[#1E5B3E] to-[#123A28] rounded-2xl my-4 relative overflow-hidden flex items-center justify-center p-4 text-center text-white'>
                <div className='absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]'></div>
                <div className='relative z-10'>
                  <GrLocationPin className='text-4xl text-amber-400 mx-auto mb-1 animate-bounce' />
                  <p className='font-medium text-xs text-emerald-200'>LIVE TRACKING</p>
                  <p className='font-bold text-sm'>{activeJob ? activeJob.title : 'No active location'}</p>
                </div>
              </div>

              {activeJob ? (
                <>
                  <h2 className='font-bold text-[#123A28] text-lg'>{activeJob.title}</h2>
                  <p className='text-[#5B6B60] mb-6 text-sm'>{activeJob.subtitle}</p>

                  <div className='space-y-4'>
                    {activeJob.timeline.map((item, index) => (
                      <React.Fragment key={index}>
                        <div className='flex gap-3 items-start'>
                          <p className={`rounded-full p-1 w-3.5 h-3.5 mt-1 shrink-0 ${
                            item.done ? 'bg-[#1E5B3E]' : 'bg-gray-300'
                          }`}></p>
                          <div>
                            <p className={`font-bold text-sm ${item.done ? 'text-gray-900' : 'text-gray-400'}`}>
                              {item.status}
                            </p>
                            <p className='text-[#5B6B60] text-xs'>{item.time}</p>
                          </div>
                        </div>
                        {index < activeJob.timeline.length - 1 && (
                          <div className='border-b border-[#DEE3D8] ml-1.5'></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </>
              ) : (
                <div className='text-center py-6 text-gray-500 text-sm'>
                  No job in progress. Accept an open offer to start tracking.
                </div>
              )}
            </div>

            {/* Weekly Earnings Panel */}
            <div className='bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100'>
              <p className='text-lg font-bold text-[#123A28] text-center sm:text-left'>This week's earnings</p>
              <p className='text-center text-3xl sm:text-4xl font-extrabold text-[#123A28] my-6'>₦18,400</p>
              <button 
                onClick={() => showToast("Payout requested. Transfer queued!")}
                className='w-full py-2.5 bg-[#123A28] hover:bg-[#1E5B3E] text-white rounded-xl font-medium transition-colors text-sm shadow-sm'
              >
                Withdraw to Bank
              </button>
            </div>
          </section>
        </section>
      </section>

      {/* View Details Interactive Modal */}
      {selectedJobModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs'>
          <div className='bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 animate-in fade-in zoom-in duration-200'>
            
            <div className='flex justify-between items-start border-b pb-3'>
              <div>
                <h3 className='text-xl font-bold text-[#123A28]'>{selectedJobModal.title}</h3>
                <p className='text-sm text-gray-500'>Posted {selectedJobModal.timeAgo}</p>
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
                  <p className='text-xs text-gray-500 uppercase font-semibold'>Estimated Payout</p>
                  <p className='text-lg font-bold text-orange-600'>{selectedJobModal.payout}</p>
                </div>
                <div className='text-right'>
                  <p className='text-xs text-gray-500 uppercase font-semibold'>Distance</p>
                  <p className='text-base font-bold'>{selectedJobModal.location}</p>
                </div>
              </div>

              <div>
                <h4 className='font-bold text-gray-700 mb-1'>Description</h4>
                <p className='text-gray-600 leading-relaxed'>{selectedJobModal.description}</p>
              </div>

              {selectedJobModal.fullDetails && (
                <div className='border-t pt-3 space-y-2'>
                  <p><span className='font-semibold text-gray-700'>Category:</span> {selectedJobModal.fullDetails.category}</p>
                  <p><span className='font-semibold text-gray-700'>Reported By:</span> {selectedJobModal.fullDetails.reportedBy}</p>
                  <p><span className='font-semibold text-gray-700'>Instructions:</span> {selectedJobModal.fullDetails.notes}</p>
                </div>
              )}
            </div>

            <div className='flex gap-3 pt-4 border-t'>
              <button 
                onClick={() => handleAcceptJob(selectedJobModal)}
                className='flex-1 bg-amber-400 hover:bg-amber-500 font-bold py-2.5 rounded-xl text-[#123A28] transition-colors text-center shadow-sm'
              >
                Accept Job Now
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