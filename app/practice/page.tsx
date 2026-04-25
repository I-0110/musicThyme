"use client"

import Nav from "@/app/ui/nav";
import PracticeForm from "@/app/ui/practice/practice-form";
import PracticeChart from "@/app/ui/practice/practice-chart";
import { usePractice } from "../lib/practice/usePractice";
import PracticeCard from "../ui/practice/practice-card";
import PracticeSummary from "../ui/practice/practice-summary";
import TeacherGoals from "../ui/practice/teacher-goals";
import ScrollToTop from "../ui/scroll-to-top";

export default function PracticePage() {
  const { entries } = usePractice()

  return (
    <div className="flex flex-col">
      <Nav />
      
      <main className="flex flex-col p-6">
        <div className="mt-4 flex grow flex-col gap-2 md:flex-row">
          {/* Left - Practice Form */}
          <section className='md:w-2/5 bg-thyme-100 rounded-lg p-6'>
            <h1 className="text-2xl text-thyme-500 font-bold ">Practice Log</h1>
            <p className=" text-thyme-300">
              Track your practice sessions and see your progress over time.
            </p>
            <PracticeForm />  
          </section>

          {/* Right - Chart, Goals, Entries on bottom */}
          <section className="md:w-3/5 bg-thyme-100 rounded-lg p-6">
            {/* Top Right - Chart and Goals (if any) side by side */}
            <div className="flex flex-col md:flex-row gap-2">

              {/* Progress Chart */}
              <div className="flex-1 p-4">
                <h2 className="text-2xl text-thyme-500 font-bold pb-2">Progress</h2>
                <PracticeSummary entries={entries} />
                <PracticeChart entries={entries} />
              </div>

              {/* Goals, if any */}
              <div className="flex-1 p-4">
                <TeacherGoals />
              </div>
            </div>

            {/* Bottom Right - Previous Logs */}
            <div className="p-4">
              <PracticeCard />
            </div>
          </section>
        </div>
        <ScrollToTop />
      </main>
    </div>
  );
}