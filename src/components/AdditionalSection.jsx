import React from 'react';

const AdditionalSection = () => {

    const steps = [
        {
            id: "01",
            title: "Find Your Doctor",
            desc: "Browse through our strictly verified specialists by their name, specialty, or hospital location.",
            icon: "🔍",
            bgColor: "bg-blue-50",
            textColor: "text-blue-600"
        },
        {
            id: "02",
            title: "Select Appointment Slot",
            desc: "Check the doctor's real-time availability, consultation fees, and pick a convenient date and time.",
            icon: "📅",
            bgColor: "bg-green-50",
            textColor: "text-green-600"
        },
        {
            id: "03",
            title: "Book & Get Status",
            desc: "Secure your appointment with a single click and manage everything easily from your dashboard.",
            icon: "⚡",
            bgColor: "bg-amber-50",
            textColor: "text-amber-600"
        }
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white border-t border-gray-100">

            <div className="text-center max-w-xl mx-auto mb-14">
                <span className="text-blue-600 bg-blue-50 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Process
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3 tracking-tight">
                    Our Booking Guide
                </h2>
                <p className="text-gray-500 text-sm sm:text-base mt-2">
                    Get your desired medical consultation done in 3 simple and hassle-free steps.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">

                {steps.map((step) => (
                    <div
                        key={step.id}
                        className="bg-white border border-gray-100/80 p-8 rounded-2xl text-center shadow-sm relative group hover:shadow-xl hover:border-blue-100 transition-all duration-300">

                        <div className="absolute top-4 right-6 text-3xl font-black text-gray-200/60 tracking-tighter select-none">
                            {step.id}
                        </div>

                        <div className={`w-16 h-16 ${step.bgColor} ${step.textColor} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                            {step.icon}
                        </div>

                        <h3 className="font-extrabold text-xl text-gray-800 group-hover:text-blue-600 transition-colors">
                            {step.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                            {step.desc}
                        </p>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default AdditionalSection;