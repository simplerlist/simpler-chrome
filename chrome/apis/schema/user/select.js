// Schema
import activitySelectFields from '+/schema/activity/selectFields'
import categorySelectFields from '+/schema/category/selectFields'
import circleSelectFields from '+/schema/circle/selectFields'
import todoSelectFields from '+/schema/todo/selectFields'
import userSelectFields from '+/schema/user/selectFields'

const ApisSchemaUserSelect = {
	...userSelectFields,
	// --- RELATIONS ---
	Activities: { select: activitySelectFields },
	Categories: { select: categorySelectFields },
	CirclesAdmin: { select: circleSelectFields },
	CirclesMember: { select: circleSelectFields },
	Todos: { select: todoSelectFields }
}

export default ApisSchemaUserSelect
