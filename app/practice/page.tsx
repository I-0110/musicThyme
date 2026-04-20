import Nav from "@/app/ui/nav";
import PracticeForm from "@/app/ui/practice/practice-form";

export default function PracticePage() {

  return (
    <main className="container mx-auto p-4">
      <Nav />
      <h1 className="text-2xl font-bold mb-4">Practice Log</h1>
      <p className="mb-4 text-gray-600">
        Track your practice sessions and see your progress over time.
      </p>

      <PracticeForm />  
    </main>
  );
}