class CreateEmailMessages < ActiveRecord::Migration
  def change
    create_table :email_messages do |t|
      t.string :receipient
      t.string :subject
      t.text :content
      t.integer :user_id

      t.timestamps
    end
    add_index :email_messages, :receipient
    add_index :email_messages, :user_id
  end
end
