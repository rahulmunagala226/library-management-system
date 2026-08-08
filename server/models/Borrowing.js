import mongoose from 'mongoose';

const borrowingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
  status: { type: String, enum: ['borrowed', 'returned', 'overdue'], default: 'borrowed' },
  fine: { type: Number, default: 0 },
  fineStatus: { type: String, enum: ['No Fine', 'Pending', 'Paid'], default: 'No Fine' },
  createdAt: { type: Date, default: Date.now },
});

const Borrowing = mongoose.model('Borrowing', borrowingSchema);

export default Borrowing;
