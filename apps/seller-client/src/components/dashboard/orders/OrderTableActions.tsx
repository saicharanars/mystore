// import { ProductType } from '@ecommerce/types';
// import { useProductDispatch } from '../store/product/producthooks';
// import AuthContext from '../store/context/Authcontext';
// import { useContext } from 'react';
// import { Ellipsis, X, Pencil, LoaderCircle, CircleCheck } from 'lucide-react';
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogTrigger,
//   DropdownMenu,
//   DropdownMenuContent,
//   Button,
//   DropdownMenuTrigger,
// } from '@ecommerce/ui-kit/ui';

// interface ActionsProps {
//   item: ProductType;
// }

// const TableActions: React.FC<ActionsProps> = ({ item }) => {
//   const dispatch = useProductDispatch();
//   const authctx = useContext(AuthContext);
//   const token = `Bearer ${authctx.token}`;
//   const [deleteProduct, { isLoading, isError, isSuccess }] =
//     useDeleteProductMutation();

//   const handleDelete = async () => {
//     try {
//       await deleteProduct({ id: item._id, token }).unwrap();
//       console.log('Deleted item:', item._id);
//       dispatch(removeProduct({ id: item._id }));
//     } catch (err) {
//       console.error('Error deleting item:', err);
//     }
//   };

//   const successMessage = () => (
//     <div>
//       <CircleCheck className="h-20 w-20 text-primary mx-auto rounded-full" />
//       <h1 className="mx-auto text-xl text-center md:text-2xl">
//         sucessfully deleted item
//       </h1>
//     </div>
//   );

//   return (
//     <div className="flex flex-row items-center">
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Ellipsis className="h-3 w-" />
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="flex flex-col justify-center w-full gap-2">
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button
//                 variant={'secondary'}
//                 className="flex flex-row justify-center w-full gap-2"
//               >
//                 <X className="mr-2 h-4 w-4" />
//                 <span className="cursor-pointer">Delete</span>
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="p-4">
//               <DialogTitle>Are you Sure</DialogTitle>
//               <div className="h-full flex items-center justify-center">
//                 {isLoading && (
//                   <LoaderCircle
//                     strokeWidth="3"
//                     className="text-primary h-8 w-8 animate-spin"
//                   />
//                 )}

//                 {isError && <h1> sumething went wrong</h1>}
//               </div>

//               {isSuccess ? (
//                 successMessage()
//               ) : (
//                 <div className="grid grid-cols-2 gap-3">
//                   <Button
//                     variant={'outline'}
//                     className="flex flex-row justify-center w-full gap-2"
//                   >
//                     <span>
//                       <DialogClose>
//                         <p>no</p>
//                       </DialogClose>
//                     </span>
//                   </Button>
//                   <Button
//                     onClick={handleDelete}
//                     variant={'destructive'}
//                     className="flex flex-row justify-center w-full gap-2"
//                   >
//                     <span>Yes</span>
//                   </Button>
//                 </div>
//               )}
//             </DialogContent>
//           </Dialog>

//           <Dialog>
//             <DialogTrigger asChild>
//               <Button
//                 variant={'secondary'}
//                 className="flex flex-row justify-center w-full gap-2"
//               >
//                 <Pencil className="mr-2 h-3 w-3" />
//                 <span>Edit</span>
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="p-4">
//               <DialogTitle>Edit Product</DialogTitle>
//               {/* <AddJobForm job={item} /> */}
//               <div className="max-h-80 overflow-scroll">
//                 <EditProductForm product={item} />
//               </div>
//             </DialogContent>
//           </Dialog>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// };

// export default TableActions;
