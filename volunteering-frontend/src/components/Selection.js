

// import { useState } from 'react'
// import { Bell } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useToast } from "@/components/ui/use-toast"

// const roles = ['Event Setup', 'Registration', 'Food Service', 'Clean Up']
// const tasks = ['Morning Shift', 'Afternoon Shift', 'Evening Shift']

// type Selection = {
//   id: number;
//   volunteerName: string;
//   role: string;
//   tasks: string[];
// }

// export default function OrganizerDashboard() {
//   const [selectedRole, setSelectedRole] = useState<string>('')
//   const [selectedTasks, setSelectedTasks] = useState<string[]>([])
//   const [pendingSelections, setPendingSelections] = useState<Selection[]>([])
//   const [hasNewNotification, setHasNewNotification] = useState(false)
//   const { toast } = useToast()

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (selectedRole && selectedTasks.length > 0) {
//       const newSelection: Selection = {
//         id: Date.now(),
//         volunteerName: `Volunteer ${pendingSelections.length + 1}`, // Simulating volunteer names
//         role: selectedRole,
//         tasks: selectedTasks,
//       }
//       setPendingSelections([...pendingSelections, newSelection])
//       setHasNewNotification(true)
//       setSelectedRole('')
//       setSelectedTasks([])
//       toast({
//         title: "Selection submitted",
//         description: "Your role and task selection has been sent to the organizer.",
//       })
//     }
//   }

//   const handleApprove = (id: number) => {
//     setPendingSelections(pendingSelections.filter(selection => selection.id !== id))
//     setHasNewNotification(pendingSelections.length > 1)
//     toast({
//       title: "Selection approved",
//       description: "The volunteer's selection has been approved.",
//     })
//   }

//   const handleDisable = (id: number) => {
//     setPendingSelections(pendingSelections.filter(selection => selection.id !== id))
//     setHasNewNotification(pendingSelections.length > 1)
//     toast({
//       title: "Selection disabled",
//       description: "The volunteer's selection has been disabled.",
//     })
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Organizer Dashboard</h1>
      
//       <Tabs defaultValue="volunteer" className="mb-6">
//         <TabsList>
//           <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
//           <TabsTrigger value="organizer">Organizer</TabsTrigger>
//         </TabsList>
//         <TabsContent value="volunteer">
//           <Card>
//             <CardHeader>
//               <CardTitle>Volunteer Selection</CardTitle>
//               <CardDescription>Choose your role and tasks</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <Select value={selectedRole} onValueChange={setSelectedRole}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a role" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {roles.map(role => (
//                       <SelectItem key={role} value={role}>{role}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <div className="space-y-2">
//                   {tasks.map(task => (
//                     <div key={task} className="flex items-center space-x-2">
//                       <Checkbox
//                         id={task}
//                         checked={selectedTasks.includes(task)}
//                         onCheckedChange={(checked) => {
//                           setSelectedTasks(
//                             checked
//                               ? [...selectedTasks, task]
//                               : selectedTasks.filter((t) => t !== task)
//                           )
//                         }}
//                       />
//                       <label htmlFor={task}>{task}</label>
//                     </div>
//                   ))}
//                 </div>
//                 <Button type="submit">Submit Selection</Button>
//               </form>
//             </CardContent>
//           </Card>
//         </TabsContent>
//         <TabsContent value="organizer">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center justify-between">
//                 Organizer Actions
//                 {hasNewNotification && (
//                   <Bell className="h-5 w-5 text-yellow-500 animate-bounce" />
//                 )}
//               </CardTitle>
//               <CardDescription>Manage volunteer selections</CardDescription>
//             </CardHeader>
//             <CardContent>
//               {hasNewNotification && (
//                 <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
//                   <p className="font-bold">New Selection!</p>
//                   <p>You have new volunteer selections to review.</p>
//                 </div>
//               )}
//               {pendingSelections.length > 0 ? (
//                 <ul className="space-y-4">
//                   {pendingSelections.map(selection => (
//                     <li key={selection.id} className="border p-4 rounded-md">
//                       <p><strong>Volunteer:</strong> {selection.volunteerName}</p>
//                       <p><strong>Role:</strong> {selection.role}</p>
//                       <p><strong>Tasks:</strong> {selection.tasks.join(', ')}</p>
//                       <div className="mt-2 space-x-2">
//                         <Button onClick={() => handleApprove(selection.id)} variant="outline">Approve</Button>
//                         <Button onClick={() => handleDisable(selection.id)} variant="destructive">Disable</Button>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No pending selections to review.</p>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }
