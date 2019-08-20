# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
Photo.delete_all

User.create(name:"Grace")
User.create(name:"Eric")
Photo.create(url:"url1",user_id:1)
Photo.create(url:"url1",user_id:2)
Photo.create(url:"url2",user_id:1)
Photo.create(url:"url4",user_id:1)
