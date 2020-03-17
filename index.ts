import { OcariotRabbitMQClient } from '@ocariot/rabbitmq-client-node'

const options = {
    retries: 1, // infinite
    interval: 1000,
    rpcTimeout: 5000,
    receiveFromYourself: true // Useful for testing only, its default value is false.
}

const eventBus: OcariotRabbitMQClient = new OcariotRabbitMQClient(
    'test.app',
    'amqp://ocariot:VklmWWdVdFI5QUxXNzM5YmFKTGhZZE1iV0hyeEdjUQo=@ocariot.tk',
    options
)

eventBus.logger('warn', 'ocariot-rabbitmq-node')

/**
 * SUBSCRIBE IN EVENTS
 * You subscribe to all events you want only once and as soon as the service started.
 *
 * Functions start with the word "sub"
 */
eventBus
    .subSaveChild(message => {
        console.log('subSaveChild() received', message)
    })
    .then(() => console.log('subSaveChild() registered successfully!'))
    .catch((err) => console.log('subSaveChild() error', err.message))

eventBus
    .subSaveLog(message => {
        console.log('subSaveLog() received', message)
    })
    .then(() => console.log('SubSaveLog() registered successfully!'))
    .catch((err) => console.log('SubSaveLog() error', err.message))


eventBus
    .subDeleteUser(message => {
        console.log('subDeleteUser() received', message)
    })
    .then(() => console.log('subDeleteUser() registered successfully!'))
    .catch((err) => console.log('subDeleteUser() error', err.message))

eventBus
    .subSyncPhysicalActivity(message => {
        console.log('subSyncPhysicalActivity() received', message)
    })
    .then(() => console.log('subSyncPhysicalActivity() registered successfully!'))
    .catch((err) => console.log('subSyncPhysicalActivity() error', err.message))

/**
 * RPC Client
 * This is where you request a resource on the bus and someone responds!
 *
 * Functions start with the word "get"
 */

// get all children age = 11
// To get all the children, pass the empty query string

eventBus
    .getEducators("?institution=5e4aa0da7f639700b68662a8")
    .then(res => {
        console.log('---------------------------------------------------------------------------------------------------------')
        console.log('getEducators() result:', res)
        console.log('---------------------------------------------------------------------------------------------------------')

    })
    .catch((err) => {
        console.log('getChildren() error', err.message)
    })
    
// get all physical activities of a child
/*
eventBus
    .getPhysicalActivities('?child_id=5d7bb0dd19cc1c00126ca68a')
    .then(res => {
        console.log('---------------------------------------------------------------------------------------------------------')
        console.log('getPhysicalActivities() result:', res)
        console.log('---------------------------------------------------------------------------------------------------------')

    })
    .catch((err) => {
        console.log('getPhysicalActivities() error', err.message)
    })
*/
// retrieve sleep records from a day: ?child_id=5da8f7966b1ed80012773515&end_at=2018-08-19&period=1d
// retrieve sleep records of the week: ?child_id=5da8f7966b1ed80012773515&end_at=2018-08-19&period=1w
// retrieve sleep records a range: ?child_id=5da8f7966b1ed80012773515&start_time=gt:2018-08-17&start_time=lte:2018-09-01
/*eventBus
    .getSleep('?child_id=5da90de002c9c30019398c9a&end_at=2018-08-18&period=1d')
    .then(res => {
        console.log('---------------------------------------------------------------------------------------------------------')

        console.log('getSleep() result:', res)
        console.log('---------------------------------------------------------------------------------------------------------')
    })
    .catch((err) => {
        console.log('getSleep() error', err.message)
    })
*/

// retrieve total [steps, calories...] in day: ?child_id=5da8f7966b1ed80012773515&type=steps&date=2019-04-23
// retrieve total [steps, calories...] a range: ?child_id=5da8f7966b1ed80012773515&type=active_minutes&date=gte:2019-04-23&date=lte:2019-04-27
/*
eventBus
    .getLogs('5da90de002c9c30019398c9a','2019-04-23', '2019-04-27')
    .then(res => {
        console.log('---------------------------------------------------------------------------------------------------------')

        console.log('getLogs() result:', res)
        console.log('---------------------------------------------------------------------------------------------------------')
    })
    .catch((err) => {
        console.log('getLogs() error', err.message)
    })
*/
/**
 * PUBLISH EVENTS
 * Use to post events you subscribe to. Make sure receiveFromYourself = true in options.
 * This is useful for testing only.
 *
 * Functions start with the word "pub"
 */
// setTimeout(() => {
//     eventBus
//         .pubSaveChild({
//             'id': '5da8f4ea6b1ed80012773514',
//             'username': 'BR0001',
//             'institution_id': '5da8f4296b1ed80012773513',
//             'gender': 'male',
//             'age': 11
//         })
//         .then(() => console.log('pubSaveChild() published successfully!'))
//         .catch((err) => console.log('pubSaveChild() error', err.message))
//
//     eventBus
//         .pubDeleteUser({
//             'id': '5da8f4ea6b1ed80012773514',
//             'username': 'BR0001',
//             'type': 'child'
//         })
//         .then(() => console.log('pubSaveChild() published successfully!'))
//         .catch((err) => console.log('pubSaveChild() error', err.message))
// }, 1000)
